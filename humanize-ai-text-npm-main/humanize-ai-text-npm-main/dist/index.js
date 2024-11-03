"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HumanizedError = void 0;
class HumanizedError extends Error {
    constructor(message, status, response) {
        super(message);
        this.name = "HumanizedError";
        this.status = status;
        this.response = response;
    }
}
exports.HumanizedError = HumanizedError;
class HumanizedAI {
    constructor(options = {}) {
        this.apiKey = options.apiKey || process.env.HUMANIZED_AI_API_KEY || "";
        if (!this.apiKey) {
            throw new Error("API key is required. Set it in the constructor or use the HUMANIZED_AI_API_KEY environment variable.");
        }
        this.baseUrl = options.baseUrl || "https://api.humanize-ai-text.ai/v1";
    }
    run(text) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${this.baseUrl}/humanize`;
            const response = yield fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this.apiKey}`,
                },
                body: JSON.stringify({ text }),
            });
            if (!response.ok) {
                const errorData = yield response.json();
                throw new HumanizedError(errorData.message || "API request failed", response.status, errorData);
            }
            return yield response.json();
        });
    }
}
exports.default = HumanizedAI;
