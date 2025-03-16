import type { ContentValue, InsertOperation, SanityActionResult, SanityClient } from '../types/sanity.js';
interface SanityAction {
    create?: Record<string, ContentValue>;
    createOrReplace?: Record<string, ContentValue>;
    createIfNotExists?: Record<string, ContentValue>;
    patch?: {
        id: string;
        set?: Record<string, ContentValue>;
        setIfMissing?: Record<string, ContentValue>;
        unset?: string[];
        insert?: InsertOperation;
        inc?: Record<string, number>;
        dec?: Record<string, number>;
    };
    delete?: {
        id: string;
    };
    actionType?: string;
    draftId?: string;
    publishedId?: string;
    releaseId?: string;
    metadata?: Record<string, ContentValue>;
    attributes?: Record<string, ContentValue>;
}
interface SanityProject {
    id: string;
    displayName: string;
    organizationId: string;
    isDefault: boolean;
    createdAt: string;
    studioHost?: string;
    members: Array<{
        id: string;
        role: string;
    }>;
}
/**
 * Creates a configured Sanity client instance
 *
 * @param projectId - Sanity project ID
 * @param dataset - Dataset name (default: 'production')
 * @param options - Additional options to pass to the Sanity client
 * @returns Configured Sanity client instance
 */
export declare function createSanityClient(projectId: string, dataset?: string, options?: {
    useCdn?: boolean;
    token?: string;
    apiVersion?: string;
    perspective?: 'published' | 'previewDrafts' | 'raw';
    [key: string]: unknown;
}): SanityClient;
/**
 * Checks if the provided API version is sufficient for the required minimum version
 *
 * @param currentVersion - Current API version (e.g., '2024-05-23')
 * @param requiredVersion - Minimum required API version
 * @returns True if current version is equal to or newer than required
 */
export declare function isSufficientApiVersion(currentVersion: string, requiredVersion: string): boolean;
/**
 * Makes direct HTTP requests to Sanity APIs not covered by the clien
 */
export declare const sanityApi: {
    /**
     * Fetches all projects accessible to the user
     *
     * @returns Promise with list of projects
     */
    listProjects(): Promise<SanityProject[]>;
    /**
     * Call the Sanity Actions API
     *
     * @param projectId - Sanity project ID
     * @param dataset - Dataset name
     * @param actions - Array of action objects
     * @returns Promise with action resul
     */
    performActions(projectId: string, dataset: string, actions: SanityAction[]): Promise<SanityActionResult>;
};
export {};
