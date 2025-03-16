/**
 * Logger utility that redirects all output to stderr to avoid interfering with MCP JSON communication
 */
/**
 * Logger implementation that redirects all output to stderr
 * This ensures logs don't interfere with the MCP protocol JSON communication on stdou
 */
export const logger = {
    info: (...args) => console.error('[INFO]', ...args),
    error: (...args) => console.error('[ERROR]', ...args),
    warn: (...args) => console.error('[WARN]', ...args),
    debug: (...args) => console.error('[DEBUG]', ...args)
};
/**
 * Special write function for MCP protocol outputs
 * Ensures protocol responses go to stdout while logs go to stderr
 */
export const mcpWrite = (data) => {
    try {
        process.stdout.write(`${data}\n`);
    }
    catch (err) {
        logger.error('Error writing to stdout:', err);
    }
};
export default logger;
//# sourceMappingURL=logger.js.map