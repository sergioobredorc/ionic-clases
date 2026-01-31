import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage-angular";

@Injectable({ providedIn: 'root' })
export class TranscripcionService {

    async transcribirAudio(audioBlob: Blob): Promise<string> {
        const formData = new FormData();
        formData.append('audio', audioBlob, 'audio.webm');

        try {
            const response = await fetch('https://backend-transcripcion.onrender.com/transcribir', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            return data.texto;
        } catch (error) {
            console.error('Error conectando con backend:', error);
            return 'Error al conectar con servidor';
        }
    }

}
