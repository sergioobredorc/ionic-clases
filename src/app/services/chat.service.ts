import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
interface OpenRouterResponse {
    choices?: Array<{
        message?: {
            content?: string;
        };
    }>;
}

@Injectable({ providedIn: 'root' })
export class ChatService {

    private endpoint = 'https://openrouter.ai/api/v1/chat/completions';
    private apiKey = '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';

    constructor(private http: HttpClient) { }
    generateReply(messages: { role: string; content: string }[]): Observable<string> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`,
            'HTTP-Referer': 'http://localhost:8100',
            'X-Title': 'Ionic Chat'
        });

        const body = {
            model: 'qwen/qwen-2.5-7b-instruct',
            messages,
            temperature: 0.7
        };


        return this.http
            .post<OpenRouterResponse>(this.endpoint, body, { headers })
            .pipe(
                map(res => res?.choices?.[0]?.message?.content?.trim() || '...')
            );
    }
}
