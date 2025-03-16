interface Config {
    sanityToken?: string;
    projectId?: string;
    dataset?: string;
    apiVersion: string;
    openAiApiKey?: string;
    port: number;
    schemasDir: string;
    getSchemaPath: (projectId: string, dataset: string) => string;
}
declare const config: Config;
export default config;
