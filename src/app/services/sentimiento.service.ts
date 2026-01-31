// Decidi hacer una Mock API porque no encontre una que fuera gratuita, así que mire la documentacion de uno 
//y me fui guiando de como lo hacian y eso fui haciendo 

import { Injectable } from '@angular/core';
import { of, delay } from 'rxjs';

type Sentiment = 'POSITIVO' | 'NEGATIVO' | 'NEUTRAL';

@Injectable({
  providedIn: 'root'
})
export class SentimientoService {

  analizarTexto(texto: string) {
    const textoNormalizado = texto.toLowerCase();
    const positivas = [
      'bien', 'feliz', 'excelente', 'correcto', 'genial', 'perfecto',
      'me gusta', 'contento', 'satisfecho', 'agradable', 'increíble',
      'maravilloso', 'positivo', 'tranquilo', 'te amo'
    ];

    const negativas = [
      'mal', 'triste', 'error', 'incorrecto', 'horrible', 'terrible',
      'odio', 'molesto', 'frustrado', 'enojado', 'problema',
      'negativo', 'decepcionado', 'fatal'
    ];

    let score = 0;

    positivas.forEach(p => {
      if (textoNormalizado.includes(p)) score++;
    });

    negativas.forEach(n => {
      if (textoNormalizado.includes(n)) score--;
    });

    let sentiment: Sentiment;

    if (score > 0) sentiment = 'POSITIVO';
    else if (score < 0) sentiment = 'NEGATIVO';
    else sentiment = 'NEUTRAL';

    const confidence = Math.min(
      0.55 + Math.abs(score) * 0.1,
      0.95
    );
    const emotions =
      sentiment === 'POSITIVO'
        ? this.emocionesPositivas(score)
        : sentiment === 'NEGATIVO'
        ? this.emocionesNegativas(score)
        : ['neutralidad', 'indiferencia', 'calma'];

    const respuestaSimulada = {
      sentiment,
      confidence,
      emotions
    };
    return of(respuestaSimulada).pipe(delay(1200));
  }


  private emocionesPositivas(score: number): string[] {
    if (score >= 3) return ['alegría', 'entusiasmo', 'confianza'];
    if (score === 2) return ['satisfacción', 'optimismo'];
    return ['tranquilidad'];
  }

  private emocionesNegativas(score: number): string[] {
    if (score <= -3) return ['ira', 'frustración', 'estrés'];
    if (score === -2) return ['molestia', 'decepción'];
    return ['incomodidad'];
  }
}
