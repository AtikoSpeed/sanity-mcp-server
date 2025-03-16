/**
 * Schema-related tool definitions
 *
 * This file defines all the MCP tool definitions related to Sanity schema
 */
import { z } from 'zod';
import config from '../config/config.js';
import * as schemaController from '../controllers/schema.js';
import { createErrorResponse } from '../utils/documentHelpers.js';
/**
 * Schema tools provider class
 */
export class SchemaToolProvider {
    /**
     * Get all schema-related tool definitions
     *
     * @returns Array of tool definition objects
     */
    // eslint-disable-next-line class-methods-use-this
    getToolDefinitions() {
        return SchemaToolProvider.getToolDefinitionsStatic();
    }
    /**
     * Static method to get all schema-related tool definitions
     * This allows the method to be called without an instance
     *
     * @returns Array of tool definition objects
     */
    static getToolDefinitionsStatic() {
        return [
            {
                name: 'getSchema',
                description: 'Get the complete schema for a dataset',
                parameters: z.object({
                    projectId: z.string().optional().describe('Project ID, if not provided will use the project ID from the environment'),
                    dataset: z.string().optional().describe('Dataset name, if not provided will use the dataset from the environment')
                }),
                handler: async (args) => {
                    try {
                        const result = await schemaController.getSchema(args.projectId || config.projectId || '', args.dataset || config.dataset || 'production');
                        return result;
                    }
                    catch (error) {
                        return createErrorResponse('Error retrieving schema', error);
                    }
                }
            },
            {
                name: 'listSchemaTypes',
                description: 'List all schema types for a dataset',
                parameters: z.object({
                    projectId: z.string().optional().describe('Project ID, if not provided will use the project ID from the environment'),
                    dataset: z.string().optional().describe('Dataset name, if not provided will use the dataset from the environment'),
                    includeDetails: z.boolean().optional().describe('Whether to include detailed type information')
                }),
                handler: async (args) => {
                    try {
                        const result = await schemaController.listSchemaTypes(args.projectId || config.projectId || '', args.dataset || config.dataset || 'production', args.includeDetails);
                        return result;
                    }
                    catch (error) {
                        return createErrorResponse('Error listing schema types', error);
                    }
                }
            },
            {
                name: 'getTypeSchema',
                description: 'Get the schema for a specific type',
                parameters: z.object({
                    projectId: z.string().optional().describe('Project ID, if not provided will use the project ID from the environment'),
                    dataset: z.string().optional().describe('Dataset name, if not provided will use the dataset from the environment'),
                    typeName: z.string().describe('The name of the type to get schema for')
                }),
                handler: async (args) => {
                    try {
                        const result = await schemaController.getTypeSchema(args.projectId || config.projectId || '', args.dataset || config.dataset || 'production', args.typeName);
                        return result;
                    }
                    catch (error) {
                        return createErrorResponse('Error retrieving type schema', error);
                    }
                }
            }
        ];
    }
}
//# sourceMappingURL=schemaTools.js.map