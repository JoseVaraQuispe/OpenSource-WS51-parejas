import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Movie } from '../models/movie.model';
import { catchError, Observable, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  base_Url = 'http://localhost:3000/movies';
  constructor(private http: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      //Default
      console.log(`An error occured ${error.status}, body was: ${error.error}`);
    } else {
      //Unsuccessfull response from Backend
      console.log(`An error occured ${error.status}, body was: ${error.error}`);
    }

    return throwError('Something happendend with request, try again later...');
  }

  createItem(item: any): Observable<Movie> {
    return this.http
      .post<Movie>(this.base_Url, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  getList(): Observable<Movie> {
    return this.http
      .get<Movie>(this.base_Url)
      .pipe(retry(2), catchError(this.handleError));
  }

  getItem(id: string): Observable<Movie> {
    return this.http
      .get<Movie>(this.base_Url + '/' + id)
      .pipe(retry(2), catchError(this.handleError));
  }

  updateItem(id: string, item: any): Observable<Movie> {
    return this.http
      .put<Movie>(
        `${this.base_Url}/${id}`,
        JSON.stringify(item),
        this.httpOptions
      )
      .pipe(retry(2), catchError(this.handleError));
  }

  deleteItem(id: string): Observable<Movie> {
    return this.http
      .delete<Movie>(`${this.base_Url}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
