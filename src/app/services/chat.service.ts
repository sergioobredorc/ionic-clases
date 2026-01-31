import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';

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

    // Aquí pon la key incompleta para que el profe la complete
    private apiKey = 'sk-or-v1-1c413229436001171f66e2121fe4bc344e83049eab747a95225c4f86b6f98bf'; // FALTA el último caracter "9"


    constructor(private http: HttpClient) { }

    generateReply(messages: { role: string; content: string }[]): Observable<string> {
        if (!this.apiKey || !this.apiKey.endsWith('9')) {
            const mensajeInstruccion = `
⚠️ Profe: Para que el chat funcione debe completar la API Key.

1. Abra el archivo: src/app/services/chat.service.ts
2. Busque la variable apiKey
3. Agregue el carácter "9" al final de la key
4. Guarde los cambios y vuelva a ejecutar la aplicación.

Por seguridad, la API key no se subió completa al repositorio.
    `;
            console.log('API Key incompleta, retornando mensaje de instrucción sin llamar a la API');
            return of(mensajeInstruccion.trim());
        }

        // llamada HTTP...

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
