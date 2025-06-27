import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Post } from '@shared-models';
import { PostsFormService, PostsHttpService } from '@shared-services';

@Component({
  selector: 'app-add-post',
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.scss',
})
export class AddPostComponent implements OnInit {
  //#region Dependencies

  private formService = inject(PostsFormService);
  private httpService = inject(PostsHttpService);
  private destroyRef = inject(DestroyRef);
  private dialogRef = inject(MatDialogRef<this>);
  //#endregion

  //#region Properties

  addForm: FormGroup;

  //#endregion

  //#region Lifecycle hooks

  ngOnInit(): void {
    this.initForm();
  }

  //#endregion

  //#region Init

  private initForm(): void {
    this.addForm = this.formService.getAddPostForm();
  }

  //#endregion

  //#region UI Methods

  onSave(): void {
    const addedPost = { ...this.addForm.value } as Post;
    this.httpService
      .createPost(addedPost)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((newPost) => {
        this.dialogRef.close(newPost);
      });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  //#endregion
}
