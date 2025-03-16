import type { ToolDefinition } from '../types/tools.js';
/**
 * Get all tool definitions
 *
 * @returns Array of tool definition objects
 */
export declare function getToolDefinitions(): ToolDefinition[];
/**
 * Get a specific tool definition by name
 *
 * @param toolName - The name of the tool to retrieve
 * @returns The tool definition object or null if not found
 */
export declare function getToolDefinition(toolName: string): ToolDefinition | null;
/**
 * Execute a tool by name with the provided arguments
 *
 * @param toolName - The name of the tool to execute
 * @param args - The arguments to pass to the tool handler
 * @returns The result of the tool execution
 */
export declare function executeTool(toolName: string, args?: Record<string, unknown>): Promise<unknown>;
