/**
 * Type definitions index
 *
 * This file exports all type definitions from the types directory
 */
export * from './sanity.js';
export * from './sharedTypes.js';
export * from './toolProvider.js';
export * from './tools.js';
export * from './apiResponse.js';
export type { ContentArray, ContentObject, ContentValue, SanityDocument, SanityMutationResult, SanityPatch, SanityReference, SanityTransaction } from './sanity.js';
export * from './sanity.js';
import type { SanityDocument } from './sanity.js';
export interface SanityClientConfig {
    projectId: string;
    dataset: string;
    apiVersion: string;
    token?: string;
    useCdn?: boolean;
}
export interface EmbeddingIndex {
    status: 'active' | 'indexing' | 'failed';
    indexName: string;
    projectId: string;
    dataset: string;
    projection: string;
    filter: string;
    createdAt: string;
    updatedAt: string;
    failedDocumentCount: number;
    startDocumentCount: number;
    remainingDocumentCount: number;
    webhookId: string;
}
export interface SearchResult extends SanityDocument {
    score?: number;
    value?: any;
}
export interface SearchResponse {
    hits: SearchResult[];
    total: number;
}
export interface SearchOptions {
    includeMetadata?: boolean;
    limit?: number;
    filter?: string | Record<string, any>;
    indexName?: string;
    maxResults?: number;
    types?: string[];
    projectId?: string;
    dataset?: string;
}
export interface SchemaField {
    name: string;
    type: string;
    title?: string;
    description?: string;
    of?: SchemaField[];
    to?: SchemaField[];
    fields?: SchemaField[];
    options?: Record<string, any>;
    validation?: any;
    [key: string]: any;
}
export interface SchemaType {
    name: string;
    type: string;
    [key: string]: any;
}
export interface DocumentMutation {
    create?: Record<string, any>;
    createOrReplace?: Record<string, any>;
    createIfNotExists?: Record<string, any>;
    patch?: {
        id: string;
        set?: Record<string, any>;
        setIfMissing?: Record<string, any>;
        unset?: string[];
        insert?: Record<string, any>;
        inc?: Record<string, any>;
        dec?: Record<string, any>;
    };
    delete?: {
        id: string;
    };
}
export interface Release {
    id: string;
    title: string;
    description?: string;
    createdAt: string;
    updatedAt: string;
    documents: string[];
}
export interface SubscribeOptions {
    projectId: string;
    dataset: string;
    query: string;
}
export interface ApiError {
    statusCode: number;
    message: string;
    details?: Record<string, any>;
}
