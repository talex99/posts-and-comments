import { Component } from '@angular/core';
import { ListPostsComponent } from '../../components';

@Component({
  selector: 'app-posts',
  imports: [ListPostsComponent],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent {}
