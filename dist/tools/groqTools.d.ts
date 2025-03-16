import type { ToolProvider } from '../types/toolProvider.js';
import type { ToolDefinition } from '../types/tools.js';
/**
 * GROQ tools provider class
 */
export declare class GroqToolProvider implements ToolProvider {
    /**
     * Get all GROQ-related tool definitions
     *
     * @returns Array of tool definition objects
     */
    getToolDefinitions(): ToolDefinition[];
    /**
     * Static method to get all GROQ-related tool definitions
     * This allows the method to be called without an instance
     *
     * @returns Array of tool definition objects
     */
    static getToolDefinitionsStatic(): ToolDefinition[];
}
