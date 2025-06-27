import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Post } from '../../../../shared/models';
import {
  PostsFormService,
  PostsHttpService,
} from '../../../../shared/services';

@Component({
  selector: 'app-update-post',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './update-post.component.html',
  styleUrl: './update-post.component.scss',
})
export class UpdatePostComponent implements OnInit {
  //#region Dependencies

  private data = inject(MAT_DIALOG_DATA);
  private httpService = inject(PostsHttpService);
  private destroyRef = inject(DestroyRef);
  private formService = inject(PostsFormService);
  private dialogRef = inject(MatDialogRef<this>);

  //#endregion

  //#region Properties

  editForm: FormGroup;
  formReady = signal<boolean>(false);

  //#endregion

  //#region Lifecycle Hooks

  ngOnInit(): void {
    this.initPost();
  }

  //#endregion

  //#region Init

  private initPost(): void {
    this.httpService
      .getPostById(this.data)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((post) => {
        this.editForm = this.formService.getEditPostForm(post);
        this.formReady.set(true);
      });
  }

  //#endregion

  //#region UI Methods

  onSave(): void {
    const updatedPost = { ...this.editForm.value } as Post;
    this.httpService
      .editPost(updatedPost)
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
