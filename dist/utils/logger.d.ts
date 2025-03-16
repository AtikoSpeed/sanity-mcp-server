/**
 * Logger utility that redirects all output to stderr to avoid interfering with MCP JSON communication
 */
/**
 * Logger interface with standard logging methods
 */
export interface Logger {
    info: (...args: unknown[]) => void;
    error: (...args: unknown[]) => void;
    warn: (...args: unknown[]) => void;
    debug: (...args: unknown[]) => void;
}
/**
 * Logger implementation that redirects all output to stderr
 * This ensures logs don't interfere with the MCP protocol JSON communication on stdou
 */
export declare const logger: Logger;
/**
 * Special write function for MCP protocol outputs
 * Ensures protocol responses go to stdout while logs go to stderr
 */
export declare const mcpWrite: (data: string) => void;
export default logger;
