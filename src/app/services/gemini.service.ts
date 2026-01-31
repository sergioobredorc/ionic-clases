import { Injectable } from "@angular/core";
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Observable, map } from "rxjs";

type GeminiPart = { text: string };
type GeminiContent = { role?: 'user' | 'model';parts: GeminiPart[] };

interface GeminiGenerateResponse{
    candidates?: Array<{
        content?: { parts?: Array<{ text?: string}> }
    }>
}

@Injectable({ providedIn: 'root'})

export class GeminiService{
    private model = 'gemini-2.5-flash';

    private apiKey = 'YOUR_API_KEY_HERE'  // reemplazar con tu API key real de gemini

    private endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${this.model}:generateContent`;

    constructor(private http: HttpClient) {}

    generateReply(conversation: GeminiContent[]): Observable<string>{
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        const body = {
            contents: conversation,
            generationConfig: { temperature: 0.7, maxOutputTokens: 2000 }
        };

        const url = `${this.endpoint}?key=${encodeURIComponent(this.apiKey)}`;

        return this.http.post<GeminiGenerateResponse>(url, body, { headers }).pipe(
        map((res) => res?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '...')
        );
    }
}