import { Component } from '@angular/core';
import { ListCommentsComponent } from '../../../components';

@Component({
  selector: 'app-comments',
  imports: [ListCommentsComponent],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss',
})
export class CommentsComponent {}
