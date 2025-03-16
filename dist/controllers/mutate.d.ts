import type { ContentValue, InsertOperation, SanityDocument } from '../types/sanity.js';
export interface CreateMutation {
    create: SanityDocumentStub;
}
export interface CreateIfNotExistsMutation {
    createIfNotExists: IdentifiedSanityDocumentStub;
}
export interface CreateOrReplaceMutation {
    createOrReplace: IdentifiedSanityDocumentStub;
}
export interface DeleteMutation {
    delete: {
        id: string;
    };
}
export interface PatchMutation {
    patch: {
        id: string;
        query?: string;
        ifRevisionID?: string;
        unset?: string[];
        set?: Record<string, ContentValue>;
        inc?: Record<string, number>;
        dec?: Record<string, number>;
        insert?: InsertOperation;
        diffMatchPatch?: Record<string, string>;
    };
}
interface SanityDocumentStub {
    _type: string;
    [key: string]: ContentValue;
}
interface IdentifiedSanityDocumentStub extends SanityDocumentStub {
    _id: string;
}
export type Mutation = CreateMutation | CreateOrReplaceMutation | CreateIfNotExistsMutation | PatchMutation | DeleteMutation;
/**
 * Interface for results returned by modifyDocuments
 */
interface MutateDocumentsResult {
    success: boolean;
    message: string;
    result: {
        transactionId: string;
        documentIds: string[];
        results: Array<{
            id: string;
            operation: string;
        }>;
    };
    documents?: SanityDocument[];
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
declare function modifyDocuments(projectId: string, dataset: string, mutations: Mutation[], returnDocuments?: boolean, options?: {
    visibility?: 'sync' | 'async' | 'deferred';
}): Promise<MutateDocumentsResult>;
export { modifyDocuments };
export declare function createDocument(projectId: string, dataset: string, document: IdentifiedSanityDocumentStub): Promise<SanityDocument | null>;
export declare function patchDocument(projectId: string, dataset: string, patch: {
    id: string;
    set?: Record<string, ContentValue>;
    unset?: string[] | string;
}): Promise<SanityDocument | null>;
export interface MutationOptions {
    returnDocuments?: boolean;
    visibility?: 'sync' | 'async' | 'deferred';
    dryRun?: boolean;
    autoGenerateArrayKeys?: boolean;
    skipCrossDatasetReferenceValidation?: boolean;
    params?: Record<string, ContentValue>;
}
export interface MutationResult {
    transactionId: string;
    documentIds: string[];
    results: Array<{
        id: string;
        operation: string;
    }>;
    result: Record<string, ContentValue>;
    documents?: SanityDocument[];
}
