/**
 * Document helper utility functions for Sanity operations
 */
import type { PatchOperations, SanityClient, SanityDocument, SanityError, SanityPatch } from '../types/sanity.js';
/**
 * Normalizes document ID to ensure it has a 'drafts.' prefix
 *
 * @param documentId - The document ID to normalize
 * @returns The normalized document ID with 'drafts.' prefix
 */
export declare function normalizeDraftId(documentId: string): string;
/**
 * Normalizes a document ID by removing any 'drafts.' prefix
 *
 * @param documentId - The document ID to normalize
 * @returns The normalized document ID without 'drafts.' prefix
 */
export declare function normalizeBaseDocId(documentId: string): string;
/**
 * Apply patch operations to a Sanity patch object
 *
 * @param patch - Patch operations to apply
 * @param patchObj - Patch object to apply them to
 * @returns The updated patch object
 */
export declare function applyPatchOperations(patch: PatchOperations, patchObj: SanityPatch): SanityPatch;
/**
 * Retrieves document content, trying draft first then published version
 *
 * @param client - Sanity clien
 * @param documentId - The document ID to retrieve
 * @param fallbackContent - Optional fallback conten
 * @returns The document content or fallback conten
 * @throws Error if document not found and no fallback content provided
 */
export declare function getDocumentContent(client: SanityClient, documentId: string, fallbackContent?: SanityDocument): Promise<SanityDocument>;
/**
 * Creates a standardized error response for controller functions
 *
 * @param message - The error message
 * @param error - The original error object (optional)
 * @returns Standardized error message
 */
export declare function createErrorResponse(message: string, error?: Error | SanityError): Error;
/**
 * Normalizes document IDs from various input formats
 * Handles single IDs, arrays, and JSON string representations
 *
 * @param documentIds - Document IDs in various possible formats
 * @returns Normalized array of document IDs
 * @throws Error if no valid document IDs are provided
 */
export declare function normalizeDocumentIds(documentIds: string | string[]): string[];
