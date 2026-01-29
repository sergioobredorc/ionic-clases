import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, map } from "rxjs";

@Injectable({ providedIn: 'root' })
export class GroqService {
  private apiKey = 'YOUR_API_KEY_HERE'; 
  private url = 'https://api.groq.com/openai/v1/chat/completions';

  constructor(private http: HttpClient) {}

  generateReply(messages: any[]): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`
    });

    const body = {
      model: "llama-3.3-70b-versatile",
      messages: messages,
      temperature: 0.7
    };

    return this.http.post<any>(this.url, body, { headers }).pipe(
      map(res => res.choices[0].message.content)
    );
  }
}