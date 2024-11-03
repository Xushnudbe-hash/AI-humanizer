// src/types.ts

export interface HumanizedOptions {
  apiKey: string;
  baseUrl?: string;
}

export interface HumanizedResponse {
  success: boolean;
  input_words: number;
  output_words: number;
  humanizedText: string;
}

export interface HumanizedError extends Error {
  status?: number;
  response?: any;
}
