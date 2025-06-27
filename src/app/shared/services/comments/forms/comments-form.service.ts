import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../../../models';
@Injectable({
  providedIn: 'root',
})
export class CommentFormService {
  getAddCommentForm(): FormGroup {
    return new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      body: new FormControl('', [Validators.required]),
    });
  }

  getEditCommentForm(comment: Comment): FormGroup {
    return new FormGroup({
      id: new FormControl(comment.id, [Validators.required]),
      email: new FormControl(comment.email, [Validators.required]),
      name: new FormControl(comment.name, [Validators.required]),
      body: new FormControl(comment.body, [Validators.required]),
    });
  }
}
