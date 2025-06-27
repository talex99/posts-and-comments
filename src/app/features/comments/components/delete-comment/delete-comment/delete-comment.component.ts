import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { CommentsHttpService } from '@shared-services';

@Component({
  selector: 'app-delete-comment',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './delete-comment.component.html',
  styleUrl: './delete-comment.component.scss',
})
export class DeleteCommentComponent {
  //#region Dependencies
  private data = inject(MAT_DIALOG_DATA);
  private httpService = inject(CommentsHttpService);
  private destroyRef = inject(DestroyRef);
  private dialogRef = inject(MatDialogRef<this>);
  //#endregion

  //#region UI Methods
  onCancel(): void {
    this.dialogRef.close(false);
  }

  onDelete(): void {
    this.httpService
      .deleteComment(this.data)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.dialogRef.close(true);
      });
  }
}

//#endregion
