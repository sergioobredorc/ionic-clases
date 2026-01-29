import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, map } from "rxjs";


type ChatGPTRole = 'user' | 'assistant' | 'system';

interface ChatGPTMessage {
    role: ChatGPTRole;
    content: string;
}

interface ChatGPTResponse {
    choices?: Array<{
        message?: {
            content?: string;
        }
    }>;
    error?: {
        message?: string;
    };
}

@Injectable({ providedIn: 'root' })
export class ChatGPTService {
    private model = 'gpt-3.5-turbo';
    private apiKey = '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'
    private endpoint = `https://openrouter.ai/api/v1/chat/completions`;

    constructor(private http: HttpClient) { }


    generateReply(conversation: ChatGPTMessage[]): Observable<string> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`
        });

        const body = {
            model: this.model,
            messages: conversation,
            temperature: 0.7,
            max_tokens: 2000
        };

        return this.http.post<ChatGPTResponse>(this.endpoint, body, { headers }).pipe(
            map((res) => res?.choices?.[0]?.message?.content?.trim() || '...')
        );
    }


    sendMessage(message: string): Observable<string> {
        const conversation: ChatGPTMessage[] = [
            { role: 'user', content: message }
        ];

        return this.generateReply(conversation);
    }
}