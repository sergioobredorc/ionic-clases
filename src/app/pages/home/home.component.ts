import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    CommonModule,
    IonicModule,
    RouterLink
  ],
})
export class HomeComponent implements OnInit {

  loading = true;
  posts: any[] = [];

  constructor() {}

  ngOnInit() {}
}

