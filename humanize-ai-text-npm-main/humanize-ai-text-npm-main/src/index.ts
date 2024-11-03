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

class HumanizedError extends Error {
  status: number;
  response: any;

  constructor(message: string, status: number, response: any) {
    super(message);
    this.name = "HumanizedError";
    this.status = status;
    this.response = response;
  }
}

class HumanizedAI {
  private apiKey: string;
  private baseUrl: string;

  constructor(options: HumanizedOptions = {}) {
    this.apiKey = options.apiKey || process.env.HUMANIZED_AI_API_KEY || "";
    if (!this.apiKey) {
      throw new Error(
        "API key is required. Set it in the constructor or use the HUMANIZED_AI_API_KEY environment variable."
      );
    }
    this.baseUrl = options.baseUrl || "https://api.humanize-ai-text.ai/v1";
  }

  async run(text: string): Promise<HumanizedResponse> {
    const url = `${this.baseUrl}/humanize`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new HumanizedError(
        errorData.message || "API request failed",
        response.status,
        errorData
      );
    }

    return await response.json();
  }
}

export default HumanizedAI;
export { HumanizedOptions, HumanizedResponse, HumanizedError };
