import type { GroqSpecification, QueryResponse, SanityDocument, SanityQueryParams } from '../types/index.js';
/**
 * Searches for content using a GROQ query
 *
 * @param projectId - Sanity project ID
 * @param dataset - Dataset name
 * @param queryString - GROQ query
 * @param params - Additional parameters for the query
 * @returns The query results
 */
export declare function searchContent(projectId: string, dataset: string, queryString: string, params?: SanityQueryParams): Promise<QueryResponse<SanityDocument | SanityDocument[]>>;
/**
 * Executes GROQ queries to retrieve conten
 *
 * @param projectId - Sanity project ID
 * @param dataset - Dataset name
 * @param queryString - GROQ query to execute
 * @param params - Query parameters (if any)
 * @returns Query results
 */
export declare function query(projectId: string, dataset: string, queryString: string, params?: SanityQueryParams): Promise<{
    results: SanityDocument | SanityDocument[];
}>;
/**
 * Subscribes to real-time updates for documents matching a query
 *
 * @param projectId - Sanity project ID
 * @param dataset - Dataset name
 * @param queryString - GROQ query to listen to
 * @returns Subscription details
 */
export declare function subscribeToUpdates(projectId: string, dataset: string, queryString: string): Promise<{
    subscriptionId: string;
    query: string;
    message: string;
}>;
/**
 * Fetches the GROQ specification from the Sanity documentation
 *
 * @returns The GROQ specification
 */
export declare function getGroqSpecification(): Promise<{
    specification: GroqSpecification;
    source: string;
}>;
