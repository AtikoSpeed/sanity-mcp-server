import type { ContentObject, PatchOperations, SanityActionResult, SanityMutationResult } from '../types/sanity.js';
/**
 * Publishes a document or multiple documents (makes draft the published version)
 *
 * @param projectId - Sanity project ID
 * @param dataset - Dataset name
 * @param documentId - The document ID or array of IDs to publish
 * @returns Result of the publish operation
 */
export declare function publishDocument(projectId: string, dataset: string, documentId: string | string[]): Promise<{
    success: boolean;
    message: string;
    documentId?: string;
    documentIds?: string[];
    result: SanityActionResult;
}>;
/**
 * Unpublishes a document or multiple documents (keeps it as draft only)
 *
 * @param projectId - Sanity project ID
 * @param dataset - Dataset name
 * @param documentId - The document ID or array of IDs to unpublish
 * @returns Result of the unpublish operation
 */
export declare function unpublishDocument(projectId: string, dataset: string, documentId: string | string[]): Promise<{
    success: boolean;
    message: string;
    draftId?: string;
    draftIds?: string[];
    result: SanityActionResult;
}>;
/**
 * Creates one or more new documents in Sanity
 *
 * @param projectId - Sanity project ID
 * @param dataset - Dataset name
 * @param documents - The document or array of documents to create
 * @param options - Additional options
 * @returns Result of the create operation
 */
export declare function createDocument(projectId: string, dataset: string, documents: ContentObject | ContentObject[], options?: {
    ifExists?: 'fail' | 'ignore';
}): Promise<{
    success: boolean;
    message: string;
    documentId?: string;
    documentIds?: string[];
    result: SanityMutationResult;
}>;
/**
 * Edits one or more existing documents with patches
 *
 * @param projectId - Sanity project ID
 * @param dataset - Dataset name
 * @param documentId - The document ID or array of IDs to edi
 * @param patch - The patch operations to apply to each documen
 * @returns Result of the edit operation
 */
export declare function editDocument(projectId: string, dataset: string | undefined, documentId: string | string[], patch: PatchOperations): Promise<{
    success: boolean;
    message: string;
    documentId?: string;
    documentIds?: string[];
    result: SanityMutationResult;
}>;
/**
 * Deletes one or more documents and optionally their drafts
 *
 * @param projectId - Sanity project ID
 * @param dataset - Dataset name
 * @param documentId - The document ID or array of IDs to delete
 * @param options - Additional options
 * @returns Result of the delete operation
 */
export declare function deleteDocument(projectId: string, dataset: string, documentId: string | string[], options?: {
    includeDrafts?: string[];
    purge?: boolean;
}): Promise<{
    success: boolean;
    message: string;
    documentId?: string;
    documentIds?: string[];
    result: SanityMutationResult;
}>;
/**
 * Replaces one or more existing draft documents
 *
 * @param projectId - Sanity project ID
 * @param dataset - Dataset name
 * @param documents - The replacement document or array of documents
 * @returns Result of the replace operation
 */
export declare function replaceDraftDocument(projectId: string, dataset: string, documents: ContentObject | ContentObject[]): Promise<{
    success: boolean;
    message: string;
    documentId?: string;
    documentIds?: string[];
    result: SanityMutationResult;
}>;
/**
 * Creates document versions in a specific release
 *
 * @param projectId - Sanity project ID
 * @param dataset - Dataset name
 * @param releaseId - ID of the release to add the document version to
 * @param documentId - ID or array of IDs of the document(s) to create a version of
 * @param content - Optional content to use for the version
 * @returns Result of the create version operation
 */
export declare function createDocumentVersion(projectId: string, dataset: string, releaseId: string, documentId: string | string[], content?: ContentObject): Promise<{
    success: boolean;
    message: string;
    versionId?: string;
    versionIds?: string[];
    result: SanityMutationResult;
}>;
/**
 * Discards one or more specific versions of documents
 *
 * @param projectId - Sanity project ID
 * @param dataset - Dataset name
 * @param versionId - ID or array of IDs of the version(s) to discard
 * @param options - Additional options
 * @returns Result of the discard operation
 */
export declare function discardDocumentVersion(projectId: string, dataset: string, versionId: string | string[], options?: {
    purge?: boolean;
}): Promise<{
    success: boolean;
    message: string;
    versionId?: string;
    versionIds?: string[];
    result: SanityMutationResult;
}>;
/**
 * Marks one or more documents for unpublishing when a release is published
 *
 * @param projectId - Sanity project ID
 * @param dataset - Dataset name
 * @param releaseId - ID of the release
 * @param documentId - ID or array of IDs of the document(s) to unpublish
 * @returns Result of the unpublish with release operation
 */
export declare function unpublishDocumentWithRelease(projectId: string, dataset: string, releaseId: string, documentId: string | string[]): Promise<{
    success: boolean;
    message: string;
    documentId?: string;
    documentIds?: string[];
    result: SanityMutationResult;
}>;
/**
 * Process document IDs
 */
export declare function processDocumentIds(documentId: string | string[]): string[];
