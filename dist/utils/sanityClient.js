import { createClient } from '@sanity/client';
import fetch from 'node-fetch';
import config from '../config/config.js';
/**
 * Creates a configured Sanity client instance
 *
 * @param projectId - Sanity project ID
 * @param dataset - Dataset name (default: 'production')
 * @param options - Additional options to pass to the Sanity client
 * @returns Configured Sanity client instance
 */
export function createSanityClient(projectId, dataset = 'production', options = {}) {
    return createClient({
        projectId,
        dataset,
        apiVersion: config.apiVersion,
        token: config.sanityToken,
        useCdn: false, // Using the API directly ensures we get fresh conten
        ...options
    });
}
/**
 * Checks if the provided API version is sufficient for the required minimum version
 *
 * @param currentVersion - Current API version (e.g., '2024-05-23')
 * @param requiredVersion - Minimum required API version
 * @returns True if current version is equal to or newer than required
 */
export function isSufficientApiVersion(currentVersion, requiredVersion) {
    // Convert versions to comparable format (YYYY-MM-DD → YYYYMMDD)
    const formatVersion = (version) => {
        // Remove 'v' prefix if presen
        const cleanVersion = version.replace(/^v/, '');
        // Handle versions without dashes (already in YYYYMMDD format)
        if (!cleanVersion.includes('-')) {
            // Make sure it's a valid 8-digit number
            const numVersion = parseInt(cleanVersion, 10);
            if (!isNaN(numVersion) && cleanVersion.length === 8) {
                return numVersion;
            }
        }
        // Convert from YYYY-MM-DD forma
        const parts = cleanVersion.split('-');
        if (parts.length !== 3) {
            throw new Error(`Invalid version format: ${version}. Expected YYYY-MM-DD`);
        }
        return parseInt(parts.join(''), 10);
    };
    try {
        const current = formatVersion(currentVersion);
        const required = formatVersion(requiredVersion);
        return current >= required;
    }
    catch (error) {
        console.error(`Error comparing API versions: ${error}`);
        // If there's any error in parsing, assume version is insufficien
        return false;
    }
}
/**
 * Makes direct HTTP requests to Sanity APIs not covered by the clien
 */
export const sanityApi = {
    /**
     * Fetches all projects accessible to the user
     *
     * @returns Promise with list of projects
     */
    async listProjects() {
        const response = await fetch('https://api.sanity.io/v2021-06-07/projects', {
            headers: {
                Authorization: `Bearer ${config.sanityToken}`
            }
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch projects: ${response.statusText}`);
        }
        return response.json();
    },
    /**
     * Call the Sanity Actions API
     *
     * @param projectId - Sanity project ID
     * @param dataset - Dataset name
     * @param actions - Array of action objects
     * @returns Promise with action resul
     */
    async performActions(projectId, dataset, actions) {
        // IMPORTANT: The Actions API requires at least API version 2024-05-23
        // The correct endpoint is: https://{projectId}.api.sanity.io/v{apiVersion}/data/actions/{dataset}
        // Note: "actions" (plural) not "action" (singular)
        const url = `https://${projectId}.api.sanity.io/v${config.apiVersion}/data/actions/${dataset}`;
        console.log(`Calling actions API: ${url}`);
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${config.sanityToken}`
            },
            body: JSON.stringify({ actions })
        });
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Action API error response:', {
                status: response.status,
                statusText: response.statusText,
                errorText,
                url
            });
            throw new Error(`Action API error: ${response.status} ${response.statusText} - ${errorText}`);
        }
        return response.json();
    }
};
//# sourceMappingURL=sanityClient.js.map