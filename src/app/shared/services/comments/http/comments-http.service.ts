import { Injectable } from '@angular/core';
import { CoreHttpService } from '@core-services';
import { Comment } from '@shared-models';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CommentsHttpService extends CoreHttpService {
  public getAllComments(): Observable<Comment[]> {
    return this.get('comments');
  }

  public getCommentById(id: string): Observable<Comment> {
    return this.get(`comments/${id}`);
  }

  public editComment(comment: Comment): Observable<Comment> {
    return this.put(`comments/${comment.id}`, comment);
  }

  public createComment(comment: Comment): Observable<Comment> {
    return this.post('comments', comment);
  }

  public deleteComment(id: string): Observable<unknown> {
    return this.delete(`comments/${id}`);
  }
}
