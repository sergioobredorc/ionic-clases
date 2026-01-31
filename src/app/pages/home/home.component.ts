import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { IonHeader, IonContent, IonTitle, IonToolbar, IonButton } from "@ionic/angular/standalone";
=======
import { IonHeader, IonContent, IonTitle, IonToolbar, IonButton, } from "@ionic/angular/standalone";
>>>>>>> 70de455 (Actividad 3)
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [IonHeader, IonContent, IonTitle, IonToolbar, IonButton, RouterLink],
})
export class HomeComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
