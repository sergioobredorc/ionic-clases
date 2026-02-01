import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SentimentService {

  private API_URL = 'https://text-processing.com/api/sentiment/';

  constructor(private http: HttpClient) {}

  analyzeText(text: string): Observable<any> {
    const body = new URLSearchParams();
    body.set('text', text);

    return this.http.post<any>(
      this.API_URL,
      body.toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );
  }
}
