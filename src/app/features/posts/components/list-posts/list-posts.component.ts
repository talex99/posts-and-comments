import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  DestroyRef,
  inject,
  ViewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Post } from '@shared-models';
import { PostsHttpService } from '@shared-services';
import { filter } from 'rxjs';
import { AddPostComponent } from '../add-post/add-post.component';
import { DeletePostComponent } from '../delete-post/delete-post.component';
import { UpdatePostComponent } from '../update-post/update-post.component';

@Component({
  selector: 'app-list-posts',
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  templateUrl: './list-posts.component.html',
  styleUrl: './list-posts.component.scss',
})
export class ListPostsComponent implements AfterViewInit {
  //#region  Dependencies

  private httpService = inject(PostsHttpService);
  private destroyRef = inject(DestroyRef);
  private dialog = inject(MatDialog);

  //#endregion

  //#region Angular stuff

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  //#endregion

  //#region Properties

  public dataSource = new MatTableDataSource<Post>();
  public displayedColumns = ['id', 'title', 'body', 'actions'];
  private posts: Post[];

  //#endregion

  //#region Lifecycle Hooks

  ngAfterViewInit(): void {
    this.initPosts();
  }

  //#endregion

  //#region Init

  private initPosts(): void {
    this.httpService
      .getAllPosts()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((posts) => {
        this.posts = posts;
        this.setDataSource(posts);
      });
  }

  //#endregion

  //#region Utilities

  private setDataSource(posts: Post[]): void {
    this.dataSource = new MatTableDataSource(posts);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private updatePosts(postId: string, updatedPost: Post): void {
    const updated = this.posts.find((post) => post.id === postId);
    if (updated) {
      const index = this.posts.indexOf(updated);
      if (index !== -1) {
        this.posts[index] = { ...updatedPost };
      }
    }
  }

  //#endregion

  //#region UI Methods

  onEditPost(postId: string): void {
    this.dialog
      .open(UpdatePostComponent, {
        data: postId,
      })
      .afterClosed()
      .pipe(
        // tap((x) => console.log(x)),
        filter((response) => !!response),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((updatedPost) => {
        this.updatePosts(postId, updatedPost);
        this.setDataSource(this.posts);
      });
  }

  onDeletePost(postId: string): void {
    this.dialog
      .open(DeletePostComponent, {
        data: postId,
      })
      .afterClosed()
      .pipe(
        filter((x) => x === true),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        this.posts = this.posts.filter((post) => post.id !== postId);
        this.setDataSource(this.posts);
      });
  }

  onAddPost(): void {
    this.dialog
      .open(AddPostComponent)
      .afterClosed()
      .pipe(
        filter((x) => !!x),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((newPost) => {
        this.posts = [newPost, ...this.posts];
        this.setDataSource(this.posts);
      });
  }

  //#endregion
}
