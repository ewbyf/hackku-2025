import { GoogleGenAI } from '@google/genai';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AIService {
	private readonly ai: GoogleGenAI;

	public constructor() {
		this.ai = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY });
	}

	public async explain(term: string): Promise<string> {
		return this.ai.models
			.generateContent({
				model: 'gemini-2.0-flash',
				contents: `Explain the medical term "${term}" so that a 5th grader could understand in 100 words or less`
			})
			.then((res) => res.text!);
	}

	public async translate(language: string, text: string): Promise<string> {
		return this.ai.models
			.generateContent({
				model: 'gemini-2.0-flash',
				contents: `Translate the following into ${language} and only output the translated text: ${text}`
			})
			.then((res) => res.text!);
	}
}

