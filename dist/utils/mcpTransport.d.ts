/**
 * Custom MCP transport implementation
 *
 * This enhances the standard StdioServerTransport to ensure
 * proper communication separation between logs and MCP protocol messages.
 */
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
/**
 * Enhanced transport factory that sets up proper event handlers and returns
 * a standard StdioServerTransport instance
 */
export declare function createEnhancedTransport(): StdioServerTransport;
export declare const sanityTransport: StdioServerTransport;
