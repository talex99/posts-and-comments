import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { PostsHttpService } from '../../../../shared/services';

@Component({
  selector: 'app-delete-post',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './delete-post.component.html',
  styleUrl: './delete-post.component.scss',
})
export class DeletePostComponent {
  private data = inject(MAT_DIALOG_DATA);
  private httpService = inject(PostsHttpService);
  private destroyRef = inject(DestroyRef);
  private dialogRef = inject(MatDialogRef<this>);

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onDelete(): void {
    this.httpService
      .deletePost(this.data)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.dialogRef.close(true);
      });
  }
}
