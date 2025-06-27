import {
  Component,
  DestroyRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { filter } from 'rxjs';
import {
  AddCommentComponent,
  DeleteCommentComponent,
  UpdateCommentComponent,
} from '../..';
import { Comment } from '../../../../../shared/models';
import { CommentsHttpService } from '../../../../../shared/services';

@Component({
  selector: 'app-list-comments',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatButtonModule,
    MatSortModule,
  ],
  templateUrl: './list-comments.component.html',
  styleUrl: './list-comments.component.scss',
})
export class ListCommentsComponent implements OnInit {
  //#region Dependencies
  private httpService = inject(CommentsHttpService);
  private dialog = inject(MatDialog);
  private destroyRef = inject(DestroyRef);

  //#endregion

  //#region Properties

  public dataSource = new MatTableDataSource<Comment>();
  public displayedColumns = ['id', 'name', 'email', 'body', 'actions'];
  private comments: Comment[];

  //#endregion

  //#region Angular stuff

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  //#endregion

  //#region Lifecycle Hooks
  ngOnInit(): void {
    this.initComments();
  }
  //#region  Init

  private initComments(): void {
    this.httpService
      .getAllComments()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((comments) => {
        this.comments = comments;
        this.setDataSource(comments);
      });
  }

  //#endregion

  //#region Utilities
  private setDataSource(comments: Comment[]): void {
    this.dataSource = new MatTableDataSource(comments);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private updateComments(commentId: string, updatedComment: Comment): void {
    const updated = this.comments.find((comment) => comment.id === commentId);
    if (updated) {
      const index = this.comments.indexOf(updated);
      if (index !== -1) {
        this.comments[index] = { ...updatedComment };
      }
    }
  }

  //#endregion

  //#region UI Methods
  onEditComment(commentId: string): void {
    this.dialog
      .open(UpdateCommentComponent, { data: commentId })
      .afterClosed()
      .pipe(
        filter((response) => !!response),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((updatedComment) => {
        this.updateComments(commentId, updatedComment);
        this.setDataSource(this.comments);
      });
  }

  onDeleteComment(commentId: string): void {
    this.dialog
      .open(DeleteCommentComponent, { data: commentId })
      .afterClosed()
      .pipe(
        filter((x) => x === true),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        this.comments = this.comments.filter(
          (c) => String(c.id) !== String(commentId),
        );
        this.setDataSource(this.comments);
      });
  }

  onAddComment(): void {
    this.dialog
      .open(AddCommentComponent)
      .afterClosed()
      .pipe(
        filter((x) => !!x),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((newComment) => {
        this.comments = [newComment, ...this.comments];
        this.setDataSource(this.comments);
      });
  }
}
//#endregion
