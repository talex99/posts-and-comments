import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Post } from '../../../models';

@Injectable({
  providedIn: 'root',
})
export class PostsFormService {
  //#region Methods

  getAddPostForm(): FormGroup {
    return new FormGroup({
      title: new FormControl('', [Validators.required]),
      body: new FormControl('', [Validators.required]),
    });
  }

  getEditPostForm(post: Post): FormGroup {
    return new FormGroup({
      id: new FormControl(post.id, [Validators.required]),
      title: new FormControl(post.title, [Validators.required]),
      body: new FormControl(post.body, [Validators.required]),
    });
  }

  //#endregion
}
