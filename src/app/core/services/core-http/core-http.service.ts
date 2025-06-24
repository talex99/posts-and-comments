import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export abstract class CoreHttpService {
  //#region Dependencies

  private http = inject(HttpClient);

  //#endregion

  //#region Properties

  private apiUrl = 'https://qposoft.typicode.com/';

  //#endregion

  //#region Methods

  protected get<T>(slug: string): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}${slug}`);
  }

  protected post<T>(slug: string, body: unknown): Observable<T> {
    return this.post<T>(`${this.apiUrl}${slug}`, body);
  }

  protected put<T>(slug: string, body: unknown): Observable<T> {
    return this.put<T>(`${this.apiUrl}${slug}`, body);
  }

  protected delete<T>(slug: string): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}${slug}`);
  }

  //#endregion
}
