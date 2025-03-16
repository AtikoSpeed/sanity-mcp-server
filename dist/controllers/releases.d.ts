import type { ReleaseOptions, SanityActionResult, SanityDocument } from '../types/sanity.js';
interface ReleaseDocument {
    versionId: string;
    documentId: string;
    type: string;
    title: string;
}
/**
 * Creates a new content release
 *
 * @param projectId - Sanity project ID
 * @param dataset - Dataset name
 * @param releaseId - Unique ID for the release
 * @param title - Display title for the release
 * @param options - Optional metadata for the release
 * @returns Result of creating the release
 */
export declare function createRelease(projectId: string, dataset: string, releaseId: string, title?: string, options?: ReleaseOptions): Promise<{
    success: boolean;
    message: string;
    releaseId: string;
    result: SanityActionResult;
}>;
/**
 * Adds one or more documents to a release by creating document versions
 *
 * @param projectId - Sanity project ID
 * @param dataset - Dataset name
 * @param releaseId - ID of the release
 * @param documentIds - ID or array of IDs of the document(s) to add to the release
 * @param content - Optional custom content to use for the document version
 * @returns Result of adding the document(s) to the release
 */
export declare function addDocumentToRelease(projectId: string, dataset: string, releaseId: string, documentIds: string | string[], content?: SanityDocument): Promise<{
    success: boolean;
    message: string;
    releaseId: string;
    documentIds: string[];
    versionIds: string[];
    result: SanityActionResult;
}>;
/**
 * Removes one or more documents from a content release
 *
 * @param projectId - Sanity project ID
 * @param dataset - Dataset name
 * @param releaseId - ID of the release
 * @param documentIds - ID or array of IDs of the document(s) to remove from the release
 * @returns Result of removing the document(s) from the release
 */
export declare function removeDocumentFromRelease(projectId: string, dataset: string, releaseId: string, documentIds: string | string[]): Promise<{
    success: boolean;
    message: string;
    releaseId: string;
    documentIds: string[];
    result: SanityActionResult;
}>;
/**
 * Lists all documents in a content release
 *
 * @param projectId - Sanity project ID
 * @param dataset - Dataset name
 * @param releaseId - ID of the release
 * @returns List of documents in the release
 */
interface ReleaseDocument {
    versionId: string;
    documentId: string;
    type: string;
    title: string;
}
export declare function listReleaseDocuments(projectId: string, dataset: string, releaseId: string): Promise<{
    releaseId: string;
    documentCount: number;
    documents: ReleaseDocument[];
}>;
/**
 * Publishes all documents in a release
 *
 * @param projectId - Sanity project ID
 * @param dataset - Dataset name
 * @param releaseId - ID of the release to publish
 * @returns Result of publishing the release
 */
export declare function publishRelease(projectId: string, dataset: string, releaseId: string): Promise<{
    success: boolean;
    message: string;
    releaseId: string;
    documentCount: number;
    result: SanityActionResult;
}>;
/**
 * Lists all releases for a project and datase
 *
 * @param projectId - Sanity project ID
 * @param dataset - Dataset name
 * @returns List of all releases
 */
export declare function listReleases(projectId: string, dataset: string): Promise<{
    releases: SanityDocument[];
}>;
/**
 * Gets a specific release by ID
 *
 * @param projectId - Sanity project ID
 * @param dataset - Dataset name
 * @param releaseId - ID of the release to retrieve
 * @returns The release data
 */
export declare function getRelease(projectId: string, dataset: string, releaseId: string): Promise<{
    release: SanityDocument;
}>;
/**
 * Updates a release's information
 *
 * @param projectId - Sanity project ID
 * @param dataset - Dataset name
 * @param releaseId - ID of the release to update
 * @param updateData - Data to update on the release
 * @returns Result of updating the release
 */
export declare function updateRelease(projectId: string, dataset: string, releaseId: string, updateData: {
    title?: string;
    description?: string;
    releaseType?: 'asap' | 'scheduled';
    intendedPublishAt?: string;
}): Promise<{
    success: boolean;
    message: string;
    releaseId: string;
    result: SanityActionResult;
}>;
/**
 * Schedules a release for publishing at a specific time
 *
 * @param projectId - Sanity project ID
 * @param dataset - Dataset name
 * @param releaseId - ID of the release to schedule
 * @param publishAt - ISO string of when to publish the release
 * @returns Result of scheduling the release
 */
export declare function scheduleRelease(projectId: string, dataset: string, releaseId: string, publishAt: string): Promise<{
    success: boolean;
    message: string;
    releaseId: string;
    scheduledTime: string;
    result: SanityActionResult;
}>;
/**
 * Unschedules a previously scheduled release
 *
 * @param projectId - Sanity project ID
 * @param dataset - Dataset name
 * @param releaseId - ID of the release to unschedule
 * @returns Result of unscheduling the release
 */
export declare function unscheduleRelease(projectId: string, dataset: string, releaseId: string): Promise<{
    success: boolean;
    message: string;
    releaseId: string;
    result: SanityActionResult;
}>;
/**
 * Archives a release
 *
 * @param projectId - Sanity project ID
 * @param dataset - Dataset name
 * @param releaseId - ID of the release to archive
 * @returns Result of archiving the release
 */
export declare function archiveRelease(projectId: string, dataset: string, releaseId: string): Promise<{
    success: boolean;
    message: string;
    releaseId: string;
    result: SanityActionResult;
}>;
/**
 * Unarchives a previously archived release
 *
 * @param projectId - Sanity project ID
 * @param dataset - Dataset name
 * @param releaseId - ID of the release to unarchive
 * @returns Result of unarchiving the release
 */
export declare function unarchiveRelease(projectId: string, dataset: string, releaseId: string): Promise<{
    success: boolean;
    message: string;
    releaseId: string;
    result: SanityActionResult;
}>;
/**
 * Deletes an archived release
 *
 * @param projectId - Sanity project ID
 * @param dataset - Dataset name
 * @param releaseId - ID of the release to delete
 * @returns Result of deleting the release
 */
export declare function deleteRelease(projectId: string, dataset: string, releaseId: string): Promise<{
    success: boolean;
    message: string;
    releaseId: string;
    result: SanityActionResult;
}>;
export {};
