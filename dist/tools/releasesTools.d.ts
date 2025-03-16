import type { ToolProvider } from '../types/toolProvider.js';
import type { ToolDefinition } from '../types/tools.js';
/**
 * Releases tools provider class
 */
export declare class ReleasesToolProvider implements ToolProvider {
    /**
     * Get all releases-related tool definitions
     *
     * @returns Array of tool definition objects
     */
    getToolDefinitions(): ToolDefinition[];
    /**
     * Static method to get all releases-related tool definitions
     * This allows the method to be called without an instance
     *
     * @returns Array of tool definition objects
     */
    static getToolDefinitionsStatic(): ToolDefinition[];
}
