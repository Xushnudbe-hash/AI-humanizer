interface HumanizedOptions {
    apiKey?: string;
    baseUrl?: string;
}
interface HumanizedResponse {
    success: boolean;
    input_words: number;
    output_words: number;
    humanizedText: string;
}
declare class HumanizedError extends Error {
    status: number;
    response: any;
    constructor(message: string, status: number, response: any);
}
declare class HumanizedAI {
    private apiKey;
    private baseUrl;
    constructor(options?: HumanizedOptions);
    run(text: string): Promise<HumanizedResponse>;
}
export default HumanizedAI;
export { HumanizedOptions, HumanizedResponse, HumanizedError };
