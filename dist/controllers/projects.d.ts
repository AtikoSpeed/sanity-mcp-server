interface Organization {
    organizationId: string;
    organizationName: string;
    projects: {
        id: string;
        displayName: string;
        studioHost?: string;
        externalStudioHost?: string;
    }[];
}
interface Studio {
    type: 'sanity-hosted' | 'external';
    url: string;
}
interface StudiosResult {
    studios: Studio[];
    message?: string;
}
/**
 * List all organizations and their projects that the user has access to
 *
 * @returns Array of organizations with their projects
 */
export declare function listOrganizationsAndProjects(): Promise<Organization[]>;
/**
 * List all studios for a specific projec
 *
 * @param projectId - Sanity project ID
 * @returns Array of studio URLs
 */
export declare function listStudios(projectId: string): Promise<StudiosResult>;
export {};
