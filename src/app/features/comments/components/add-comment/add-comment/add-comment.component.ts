import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { Comment } from '../../../../../shared/models/comment';
import {
  CommentFormService,
  CommentsHttpService,
} from '../../../../../shared/services';
@Component({
  selector: 'app-add-comment',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatInput,
    MatFormField,
    MatButtonModule,
    MatLabel,
  ],
  templateUrl: './add-comment.component.html',
  styleUrl: './add-comment.component.scss',
})
export class AddCommentComponent implements OnInit {
  //#region Dependencies
  private formService = inject(CommentFormService);
  private httpService = inject(CommentsHttpService);
  private destroyRef = inject(DestroyRef);
  private dialogRef = inject(MatDialogRef<this>);
  //#endregion

  //#region Properties
  addForm: FormGroup;
  //#endregion

  //#region LifeCycle Hooks
  ngOnInit(): void {
    this.initForm();
  }
  //#endregion

  //#region Init
  initForm(): void {
    this.addForm = this.formService.getAddCommentForm();
  }
  //#endregion

  //#region UI Methods
  onCancel(): void {
    this.dialogRef.close(false);
  }

  onSave(): void {
    const addedComment = { ...this.addForm.value } as Comment;
    this.httpService
      .createComment(addedComment)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((newComment) => {
        this.dialogRef.close(newComment);
      });
  }
}
//#endregion
