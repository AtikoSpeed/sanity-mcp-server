import type { ToolProvider } from '../types/toolProvider.js';
import type { ToolDefinition } from '../types/tools.js';
/**
 * Schema tools provider class
 */
export declare class SchemaToolProvider implements ToolProvider {
    /**
     * Get all schema-related tool definitions
     *
     * @returns Array of tool definition objects
     */
    getToolDefinitions(): ToolDefinition[];
    /**
     * Static method to get all schema-related tool definitions
     * This allows the method to be called without an instance
     *
     * @returns Array of tool definition objects
     */
    static getToolDefinitionsStatic(): ToolDefinition[];
}
