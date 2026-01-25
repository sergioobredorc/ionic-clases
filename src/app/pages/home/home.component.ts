import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { 
  addCircleOutline, 
  listOutline, 
  personOutline, 
  imagesOutline, 
  personAddOutline,
  sparklesOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [IonicModule, CommonModule, RouterLink],
})
export class HomeComponent implements OnInit {

  constructor() {
    addIcons({ 
      addCircleOutline, 
      listOutline, 
      personOutline, 
      imagesOutline, 
      personAddOutline,
      sparklesOutline
    });
  }

  ngOnInit() {}

}