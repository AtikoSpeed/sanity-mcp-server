/**
 * Default values utilities
 *
 * This file provides utility functions for setting default values for parameters
 * used in controllers and tools. These functions ensure consistent defaults
 * across the codebase.
 */
/**
 * Default visibility options for mutations
 */
export declare const DEFAULT_VISIBILITY = "sync";
/**
 * Default return documents flag for mutations
 */
export declare const DEFAULT_RETURN_DOCUMENTS = false;
/**
 * Default pagination parameters
 */
export declare const DEFAULT_PAGINATION: {
    limit: number;
    offset: number;
};
/**
 * Default search parameters
 */
export declare const DEFAULT_SEARCH: {
    maxResults: number;
    includeScore: boolean;
};
/**
 * Applies default project ID and dataset values if not provided
 *
 * @param projectId Optional project ID
 * @param dataset Optional dataset name
 * @returns Object with projectId and dataset with defaults applied
 */
export declare function applyProjectDatasetDefaults(projectId?: string, dataset?: string): {
    projectId: string;
    dataset: string;
};
/**
 * Applies default mutation options
 *
 * @param options Optional mutation options
 * @returns Mutation options with defaults applied
 */
export declare function applyMutationDefaults(options?: {
    returnDocuments?: boolean;
    visibility?: 'sync' | 'async' | 'deferred';
}): {
    returnDocuments: boolean;
    visibility: 'sync' | 'async' | 'deferred';
};
/**
 * Applies default pagination parameters
 *
 * @param pagination Optional pagination parameters
 * @returns Pagination parameters with defaults applied
 */
export declare function applyPaginationDefaults(pagination?: {
    limit?: number;
    offset?: number;
}): {
    limit: number;
    offset: number;
};
/**
 * Applies default search parameters
 *
 * @param searchParams Optional search parameters
 * @returns Search parameters with defaults applied
 */
export declare function applySearchDefaults(searchParams?: {
    maxResults?: number;
    includeScore?: boolean;
}): {
    maxResults: number;
    includeScore: boolean;
};
/**
 * Applies default values to an object based on a defaults objec
 *
 * @param obj Object to apply defaults to
 * @param defaults Default values to apply
 * @returns Object with defaults applied
 */
export declare function applyDefaults<T extends Record<string, unknown>>(obj: Partial<T> | undefined, defaults: T): T;
