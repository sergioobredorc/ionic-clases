import { Component, OnInit } from '@angular/core';
import { IonHeader, IonContent, IonTitle, IonToolbar, IonButton, IonItem, IonThumbnail, IonLabel,} from "@ionic/angular/standalone";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [IonHeader, IonContent, IonTitle, IonToolbar, IonButton, RouterLink, IonItem, IonThumbnail, IonLabel, ],
})
export class HomeComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
