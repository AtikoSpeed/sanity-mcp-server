import type { EmbeddingIndex, SearchOptions, SearchResponse } from '../types/index.js';
/**
 * Lists all embeddings indices for a project and datase
 *
 * @param options - Options for listing embeddings indices
 * @returns Promise with array of embeddings indices
 */
export declare function listEmbeddingsIndices({ projectId, dataset }?: {
    projectId?: string | undefined;
    dataset?: string | undefined;
}): Promise<EmbeddingIndex[]>;
/**
 * Performs semantic search on Sanity documentation and guides using embeddings
 *
 * @param query - Natural language query to search for semantically similar conten
 * @param options - Additional search options
 * @returns Promise with search results containing hits and total properties
 */
export declare function semanticSearch(query: string, { indexName, maxResults, types, projectId, dataset }?: SearchOptions): Promise<SearchResponse>;
