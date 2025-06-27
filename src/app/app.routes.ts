import { Routes } from '@angular/router';
import { CommentsComponent } from './features/comments/pages/comments/comments/comments.component';
import { PostsComponent } from './features/posts/pages';

export const routes: Routes = [
  {
    path: '',
    component: PostsComponent,
  },
  {
    path: 'comments',
    component: CommentsComponent,
  },
];
