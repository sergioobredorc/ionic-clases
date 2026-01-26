import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common'; 
import { PostsService } from '../../services/posts.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [IonicModule, CommonModule, RouterLink],
  
})

export class HomeComponent implements OnInit{

  posts : any[] = []
  loading = true;

  constructor( private postsService: PostsService) {}
  
  ngOnInit(){
    this.postsService.getPosts().subscribe({
      next: (data) => {
        this.posts = data.slice(0,10);
        this.loading = false;
      },
      error: (err) => {
        console.error("Error al consumir la api", err)
        this.loading = false;
      }
    })
  }
}