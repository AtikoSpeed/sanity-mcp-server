import type { SchemaField, SchemaType } from '../types/index.js';
interface SchemaTypeDetails extends SchemaType {
    fields?: SchemaField[];
    [key: string]: unknown;
}
/**
 * Gets the full schema for a Sanity project and datase
 *
 * @param projectId - Sanity project ID
 * @param dataset - Dataset name (default: 'production')
 * @returns The schema objec
 */
export declare function getSchema(projectId: string, dataset?: string): Promise<SchemaTypeDetails[]>;
/**
 * Gets the schema definition for a specific type
 *
 * @param projectId - Sanity project ID
 * @param dataset - Dataset name (default: 'production')
 * @param typeName - The type name
 * @param options - Additional options for retrieving the schema
 * @returns The schema definition for the type
 */
export declare function getSchemaForType(projectId: string, dataset: string | undefined, typeName: string, options?: {
    includeReferences?: boolean;
}): Promise<SchemaTypeDetails>;
/**
 * Lists available schema types for a Sanity project and datase
 *
 * @param projectId - Sanity project ID
 * @param dataset - Dataset name (default: 'production')
 * @param options - Options for listing schema types
 * @returns Array of schema type names and their kinds
 */
export declare function listSchemaTypes(projectId: string, dataset?: string, { allTypes }?: {
    allTypes?: boolean;
}): Promise<SchemaType[]>;
/**
 * Gets the detailed schema for a specific type
 *
 * @param projectId - Sanity project ID
 * @param dataset - Dataset name (default: 'production')
 * @param typeName - The name of the type to retrieve
 * @returns The schema definition for the type
 */
export declare function getTypeSchema(projectId: string, dataset: string | undefined, typeName: string): Promise<SchemaTypeDetails>;
export {};
