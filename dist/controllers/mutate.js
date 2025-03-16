import { applyMutationDefaults } from '../utils/defaultValues.js';
import logger from '../utils/logger.js';
import { validateDocument, validateMutations } from '../utils/parameterValidation.js';
import { createSanityClient } from '../utils/sanityClient.js';
/**
 * Helper function to add create mutation to a transaction
 *
 * @param transaction - Sanity transaction
 * @param mutation - Create mutation
 */
function addCreateMutation(transaction, mutation) {
    transaction.create(mutation.create);
}
/**
 * Helper function to add createOrReplace mutation to a transaction
 *
 * @param transaction - Sanity transaction
 * @param mutation - CreateOrReplace mutation
 */
function addCreateOrReplaceMutation(transaction, mutation) {
    transaction.createOrReplace(mutation.createOrReplace);
}
/**
 * Helper function to add createIfNotExists mutation to a transaction
 *
 * @param transaction - Sanity transaction
 * @param mutation - CreateIfNotExists mutation
 */
function addCreateIfNotExistsMutation(transaction, mutation) {
    transaction.createIfNotExists(mutation.createIfNotExists);
}
/**
 * Helper function to add delete mutation to a transaction
 *
 * @param transaction - Sanity transaction
 * @param mutation - Delete mutation
 */
function addDeleteMutation(transaction, mutation) {
    transaction.delete(mutation.delete.id);
}
/**
 * Helper function to add patch mutation by ID to a transaction
 *
 * @param client - Sanity client
 * @param transaction - Sanity transaction
 * @param id - Document ID
 * @param ifRevisionID - Optional revision ID for optimistic locking
 * @param patchOperations - Operations to apply in the patch
 */
function addPatchByIdMutation(client, transaction, id, ifRevisionID, patchOperations) {
    if (!patchOperations) {
        return;
    }
    const patch = client.patch(id);
    // Apply optimistic locking if ifRevisionID is provided
    if (ifRevisionID) {
        patch.ifRevisionId(ifRevisionID);
    }
    // Apply patch operations using type assertion to work around type incompatibility
    // First cast to unknown to avoid type compatibility errors
    applyPatchOperationsToClient(patch, patchOperations);
    // Add the patch to the transaction with the correct signature
    // First cast to unknown to avoid type compatibility errors
    transaction.patch(id, patch);
}
/**
 * Helper function to add patch mutation by query to a transaction
 *
 * @param transaction - Sanity transaction
 * @param query - GROQ query string
 * @param params - Optional query parameters
 * @param patchOperations - Operations to apply in the patch
 */
function addPatchByQueryMutation(transaction, query, params, patchOperations) {
    if (!patchOperations) {
        return;
    }
    // Create a patch spec object that includes the query and params directly
    const patchSpec = {
        query,
        params,
        ...patchOperations
    };
    // Call transaction.patch directly with the patch spec object
    transaction.patch(patchSpec);
}
/**
 * Helper function to apply patch operations to a patch client
 *
 * @param patch - Sanity patch client
 * @param patchOperations - Operations to apply
 */
function applyPatchOperationsToClient(patch, patchOperations) {
    // Apply patch operations in the correct order: set, setIfMissing, unset, inc, dec, insert
    if (patchOperations.set) {
        patch.set(patchOperations.set);
    }
    if (patchOperations.setIfMissing) {
        patch.setIfMissing(patchOperations.setIfMissing);
    }
    if (patchOperations.unset) {
        patch.unset(Array.isArray(patchOperations.unset) ? patchOperations.unset : [patchOperations.unset]);
    }
    if (patchOperations.inc) {
        patch.inc(patchOperations.inc);
    }
    if (patchOperations.dec) {
        patch.dec(patchOperations.dec);
    }
    if (patchOperations.insert) {
        applyInsertOperation(patch, patchOperations.insert);
    }
}
/**
 * Helper function to apply an insert operation to a patch
 *
 * @param patch - Sanity patch
 * @param insertOp - Insert operation
 */
function applyInsertOperation(patch, insertOp) {
    const { items, position } = insertOp;
    // Get the appropriate selector
    let selector = '';
    if (insertOp.at) {
        selector = insertOp.at;
    }
    else if (insertOp.before) {
        selector = insertOp.before;
    }
    else if (insertOp.after) {
        selector = insertOp.after;
    }
    else if (insertOp.replace) {
        selector = insertOp.replace;
    }
    if (position === 'before' || position === 'after' || position === 'replace') {
        // Only execute if we have a valid selector and items
        if (selector && items) {
            patch.insert(position, selector, items);
        }
    }
}
/**
 * Helper function to process a single mutation and add it to the transaction
 *
 * @param client - Sanity clien
 * @param transaction - Sanity transaction
 * @param mutation - Mutation to process
 */
function processMutation(client, transaction, mutation) {
    // Handle create mutation
    if ('create' in mutation) {
        addCreateMutation(transaction, mutation);
    }
    // Handle createOrReplace mutation
    if ('createOrReplace' in mutation) {
        addCreateOrReplaceMutation(transaction, mutation);
    }
    // Handle createIfNotExists mutation
    if ('createIfNotExists' in mutation) {
        addCreateIfNotExistsMutation(transaction, mutation);
    }
    // Handle delete mutation
    if ('delete' in mutation) {
        addDeleteMutation(transaction, mutation);
    }
    // Handle patch mutation
    if ('patch' in mutation) {
        const { id, query, params, ifRevisionID, ...patchOperations } = mutation.patch;
        if (query) {
            // Patch by query
            addPatchByQueryMutation(transaction, query, params, patchOperations);
        }
        else if (id) {
            // Patch by ID
            addPatchByIdMutation(client, transaction, id, ifRevisionID, patchOperations);
        }
    }
}
/**
 * Retrieves a document after a create mutation
 *
 * @param client - Sanity client
 * @param document - Document with ID
 * @returns Retrieved document or null if not found
 */
async function retrieveDocumentForCreateMutation(client, document) {
    if (document && '_id' in document && document._id) {
        try {
            // Ensure document._id is treated as a string
            const documentId = String(document._id);
            const doc = await client.getDocument(documentId);
            return doc || null;
        }
        catch (error) {
            console.error('Error retrieving document:', error);
            return null;
        }
    }
    return null;
}
/**
 * Retrieves a document after a patch mutation
 *
 * @param client - Sanity clien
 * @param patch - Patch information
 * @returns Retrieved document or null if not found/applicable
 */
async function retrieveDocumentForPatchMutation(client, patch) {
    if ('id' in patch && patch.id) {
        try {
            const doc = await client.getDocument(patch.id);
            return doc || null;
        }
        catch (error) {
            console.error('Error retrieving document:', error);
            return null;
        }
    }
    return null;
}
/**
 * Retrieves a document for a specific mutation
 *
 * @param client - Sanity clien
 * @param mutation - The mutation to retrieve document for
 * @returns The document or null
 */
async function retrieveDocumentForMutation(client, mutation) {
    try {
        // Type guard for different mutation types
        if ('create' in mutation) {
            return await retrieveDocumentForCreateMutation(client, mutation.create);
        }
        else if ('createOrReplace' in mutation) {
            return await retrieveDocumentForCreateMutation(client, mutation.createOrReplace);
        }
        else if ('createIfNotExists' in mutation) {
            return await retrieveDocumentForCreateMutation(client, mutation.createIfNotExists);
        }
        else if ('patch' in mutation) {
            return await retrieveDocumentForPatchMutation(client, mutation.patch);
        }
        else if ('delete' in mutation) {
            // Deleted documents don't need to be returned
            return null;
        }
        // Unknown mutation type
        return null;
    }
    catch (error) {
        console.error('Error retrieving document for mutation:', error);
        return null;
    }
}
/**
 * Retrieves documents for each mutation
 *
 * @param client - Sanity clien
 * @param mutations - Array of mutations
 * @returns Array of documents or null values
 */
async function retrieveDocumentsForMutations(client, mutations) {
    // Process each mutation in parallel with Promise.all
    return Promise.all(mutations.map((mutation) => retrieveDocumentForMutation(client, mutation)));
}
/**
 * Modifies documents using transactions
 *
 * @param projectId - Project ID
 * @param dataset - Dataset name
 * @param mutations - Array of mutations
 * @param returnDocuments - Whether to return the modified documents
 * @param options - Additional options for the mutation
 * @returns Result object containing success status, message, and potentially documents
 */
async function modifyDocuments(projectId, dataset, mutations, returnDocuments = false, options) {
    try {
        const client = createSanityClient(projectId, dataset);
        // Validate mutations using the parameterValidation utility
        validateMutations(mutations);
        // Apply default values
        const mutationOptions = applyMutationDefaults({
            returnDocuments,
            ...options
        });
        // Create a transaction
        const transaction = client.transaction();
        // Process each mutation
        mutations.forEach((mutation) => {
            // Validate create documents using the parameterValidation utility
            if ('create' in mutation && mutation.create) {
                validateDocument(mutation.create);
            }
            // Validate createOrReplace documents
            if ('createOrReplace' in mutation && mutation.createOrReplace) {
                validateDocument(mutation.createOrReplace);
            }
            // Validate createIfNotExists documents
            if ('createIfNotExists' in mutation && mutation.createIfNotExists) {
                validateDocument(mutation.createIfNotExists);
            }
            // Add proper type information to the document before passing to transaction
            processMutation(client, transaction, mutation);
        });
        // Commit the transaction with visibility option
        const result = await transaction.commit({
            visibility: mutationOptions.visibility
        });
        if (mutationOptions.returnDocuments) {
            const documents = await retrieveDocumentsForMutations(client, mutations);
            return {
                success: true,
                message: `Successfully applied ${mutations.length} mutations`,
                result,
                documents: documents.filter(Boolean)
            };
        }
        return {
            success: true,
            message: `Successfully applied ${mutations.length} mutations`,
            result
        };
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        throw new Error(`Failed to modify documents: ${errorMessage}`);
    }
}
// Export the refactored function
export { modifyDocuments };
// Fix for the first error
export async function createDocument(projectId, dataset, document) {
    const client = createSanityClient(projectId, dataset);
    try {
        logger.info(`Creating document of type ${document._type}`);
        // Execute the create operation but don't store the result since we don't use i
        await client.createOrReplace(document);
        const createdDoc = await client.getDocument(document._id);
        return createdDoc || null; // Add null check
    }
    catch (error) {
        throw new Error(`Failed to create document: ${error.message}`);
    }
}
// Fix for the second error
export async function patchDocument(projectId, dataset, patch) {
    const client = createSanityClient(projectId, dataset);
    try {
        logger.info(`Patching document with ID ${patch.id}`);
        // Convert string to array if needed
        const unsetFields = typeof patch.unset === 'string' ? [patch.unset] : patch.unset || [];
        await client.patch(patch.id).set(patch.set || {}).unset(unsetFields)
            .commit();
        const updatedDoc = await client.getDocument(patch.id);
        return updatedDoc || null; // Add null check
    }
    catch (error) {
        throw new Error(`Failed to patch document: ${error.message}`);
    }
}
//# sourceMappingURL=mutate.js.map