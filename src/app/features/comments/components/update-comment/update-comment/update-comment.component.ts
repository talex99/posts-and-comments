import { CommonModule } from '@angular/common';
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
import { Comment } from '@shared-models';
import { CommentFormService, CommentsHttpService } from '@shared-services';
@Component({
  selector: 'app-update-comment',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './update-comment.component.html',
  styleUrl: './update-comment.component.scss',
})
export class UpdateCommentComponent implements OnInit {
  //#region Dependencies
  private data = inject(MAT_DIALOG_DATA);
  private httpService = inject(CommentsHttpService);
  private destroyRef = inject(DestroyRef);
  private formService = inject(CommentFormService);
  private dialogRef = inject(MatDialogRef<this>);
  //#endregion

  //#region Properties
  editForm: FormGroup;
  formReady = signal<boolean>(false);
  //#endregion

  //#region Lifecycle hooks
  ngOnInit(): void {
    this.initComment();
  }
  //#endregion

  //#region Init
  initComment(): void {
    this.httpService
      .getCommentById(this.data)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((comment) => {
        this.editForm = this.formService.getEditCommentForm(comment);
        this.formReady.set(true);
      });
  }
  //#endregion

  //#region UI Methods

  onSave(): void {
    const updatedComment = { ...this.editForm.value } as Comment;
    this.httpService
      .editComment(updatedComment)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((newComment) => {
        this.dialogRef.close(newComment);
      });
  }
  onCancel(): void {
    this.dialogRef.close(false);
  }
}

//#endregion
