import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenAIService {

  private apiUrl = 'http://localhost:3000/chat';

  constructor(private http: HttpClient) {}

  sendMessage(message: string): Observable<string> {
    return this.http.post<any>(this.apiUrl, { message }).pipe(
      map(res => res.reply)
    );
  }
}
