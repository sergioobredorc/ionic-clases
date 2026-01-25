import { Component, OnInit } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { PostsService } from "src/app/services/posts.service";

@Component ({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [IonicModule, CommonModule],
})

export class HomeComponent implements OnInit {
  posts: any[] = [];
  loading = true;
  constructor(private postsService: PostsService){}

  ngOnInit() {
    this.postsService.getPosts().subscribe({
      next: (data) => {
        this.posts = data.slice(0, 10);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al consumir la API', err);
        this.loading = false;
      }
    })
  }
}