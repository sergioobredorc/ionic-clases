import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { 
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton,
  IonText
 } from '@ionic/angular/standalone';

import { Article ,StorageArticleService } from 'src/app/services/storageArticle.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
  imports: [
    CommonModule,
    DatePipe,
    RouterLink,

    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonButton,
    IonText
  ]
})
export class ArticlesComponent  implements OnInit {
  articles: Article[] = [];
  loading = true;

  constructor(private storageSvc: StorageArticleService) { }

  async ngOnInit() {
    await this.load();
  }

  async load(){
    this.loading = true;
    this.articles = await this.storageSvc.getArticles();
    this.loading = false;
  }

  async deleteAll(){
    this.loading = true;
    await this.storageSvc.clearArticles();
    await this.load();
  }
}
