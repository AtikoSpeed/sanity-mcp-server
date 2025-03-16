/**
 * Parameter validation utilities
 *
 * This file provides utility functions for validating parameters used in
 * controllers and tools. These functions ensure that required parameters
 * are present and properly formatted before operations are performed.
 */
/**
 * Validates and normalizes project ID and dataset parameters
 *
 * @param projectId Optional project ID parameter
 * @param dataset Optional dataset parameter
 * @returns Object containing validated project ID and datase
 * @throws Error if required parameters cannot be determined
 */
export declare function validateProjectDataset(projectId?: string, dataset?: string): {
    projectId: string;
    dataset: string;
};
/**
 * Validates document ID parameter
 *
 * @param documentId Document ID or array of document IDs
 * @returns Normalized array of document IDs
 * @throws Error if document ID is missing or invalid
 */
export declare function validateDocumentId(documentId: string | string[]): string[];
/**
 * Validates mutations array
 *
 * @param mutations Array of mutations
 * @throws Error if mutations array is invalid
 */
export declare function validateMutations(mutations: unknown[]): void;
/**
 * Validates a document objec
 *
 * @param document Document objec
 * @throws Error if document is invalid
 */
export declare function validateDocument(document: Record<string, unknown>): void;
/**
 * Validates a GROQ query
 *
 * @param query GROQ query string
 * @throws Error if query is invalid
 */
export declare function validateGroqQuery(query: string): void;
/**
 * Validates a release ID
 *
 * @param releaseId Release ID
 * @throws Error if release ID is invalid
 */
export declare function validateReleaseId(releaseId: string): void;
/**
 * Validates an embeddings index name
 *
 * @param indexName Embeddings index name
 * @throws Error if index name is invalid
 */
export declare function validateIndexName(indexName: string): void;
