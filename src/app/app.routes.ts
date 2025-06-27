import { Routes } from '@angular/router';
import { Path } from './shared/enums';

export const routes: Routes = [
  {
    path: Path.Root,
    loadComponent: () =>
      import('./features/posts/pages').then((c) => c.PostsComponent),
  },
  {
    path: Path.Comments,
    loadComponent: () =>
      import('./features/comments/pages').then((c) => c.CommentsComponent),
  },
];
