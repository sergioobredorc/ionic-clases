import { Injectable } from "@angular/core";
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Observable, map } from "rxjs";

type CopilotMessage = { role: 'user' | 'assistant' | 'system'; content: string };


interface CopilotResponse {
    choices?: Array<{
    message?: { role:string; content: string }
    }>
}

@Injectable({ providedIn: 'root'})

export class CopilotService {
    private model = 'openai/gpt-3.5-turbo';
    private apiKey = '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';
    private endpoint = `https://openrouter.ai/api/v1/chat/completions`;

    constructor(private http: HttpClient) {}

    generateReply(conversation: CopilotMessage[]): Observable<string>{
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

        return this.http.post<CopilotResponse>(this.endpoint, body, { headers }).pipe(
        map((res) => res?.choices?.[0]?.message?.content?.trim() || '...')
        );
    }
}