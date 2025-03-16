/**
 * Default values utilities
 *
 * This file provides utility functions for setting default values for parameters
 * used in controllers and tools. These functions ensure consistent defaults
 * across the codebase.
 */
import config from '../config/config.js';
/**
 * Default visibility options for mutations
 */
export const DEFAULT_VISIBILITY = 'sync';
/**
 * Default return documents flag for mutations
 */
export const DEFAULT_RETURN_DOCUMENTS = false;
/**
 * Default pagination parameters
 */
export const DEFAULT_PAGINATION = {
    limit: 20,
    offset: 0
};
/**
 * Default search parameters
 */
export const DEFAULT_SEARCH = {
    maxResults: 10,
    includeScore: true
};
/**
 * Applies default project ID and dataset values if not provided
 *
 * @param projectId Optional project ID
 * @param dataset Optional dataset name
 * @returns Object with projectId and dataset with defaults applied
 */
export function applyProjectDatasetDefaults(projectId, dataset) {
    return {
        projectId: projectId || config.projectId || '',
        dataset: dataset || config.dataset || ''
    };
}
/**
 * Applies default mutation options
 *
 * @param options Optional mutation options
 * @returns Mutation options with defaults applied
 */
export function applyMutationDefaults(options) {
    return {
        returnDocuments: options?.returnDocuments ?? DEFAULT_RETURN_DOCUMENTS,
        visibility: options?.visibility ?? DEFAULT_VISIBILITY
    };
}
/**
 * Applies default pagination parameters
 *
 * @param pagination Optional pagination parameters
 * @returns Pagination parameters with defaults applied
 */
export function applyPaginationDefaults(pagination) {
    return {
        limit: pagination?.limit ?? DEFAULT_PAGINATION.limit,
        offset: pagination?.offset ?? DEFAULT_PAGINATION.offset
    };
}
/**
 * Applies default search parameters
 *
 * @param searchParams Optional search parameters
 * @returns Search parameters with defaults applied
 */
export function applySearchDefaults(searchParams) {
    return {
        maxResults: searchParams?.maxResults ?? DEFAULT_SEARCH.maxResults,
        includeScore: searchParams?.includeScore ?? DEFAULT_SEARCH.includeScore
    };
}
/**
 * Applies default values to an object based on a defaults objec
 *
 * @param obj Object to apply defaults to
 * @param defaults Default values to apply
 * @returns Object with defaults applied
 */
export function applyDefaults(obj, defaults) {
    if (!obj) {
        return { ...defaults };
    }
    const result = { ...defaults };
    // Apply provided values over defaults
    for (const key in obj) {
        if (obj[key] !== undefined) {
            result[key] = obj[key];
        }
    }
    return result;
}
//# sourceMappingURL=defaultValues.js.map