import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CoreHttpService } from '../../../../core/services/core-http/core-http.service';
import { Post } from '../../../models';

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
