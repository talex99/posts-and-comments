import { Injectable } from '@angular/core';
import { CoreHttpService } from '@core-services';
import { Post } from '@shared-models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsHttpService extends CoreHttpService {
  //#region Methods

  public getAllPosts(): Observable<Post[]> {
    return this.get('posts');
  }

  public getPostById(id: string): Observable<Post> {
    return this.get(`posts/${id}`);
  }

  public editPost(post: Post): Observable<Post> {
    return this.put(`posts/${post.id}`, post);
  }

  public createPost(post: Post): Observable<Post> {
    return this.post('posts', post);
  }

  public deletePost(id: string): Observable<unknown> {
    return this.delete(`posts/${id}`);
  }

  //#endregion
}
