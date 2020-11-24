import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExternasService {

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  // Obtem todos os dados
  urlCovid = 'http://localhost:3000/data_covid_brasil'; // api rest fake
  getCovid(): Observable<any> {
    return this.httpClient.get(this.urlCovid)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  // Obtem todos os dados
  urlCausasExternas = 'http://localhost:3000/data_causas_externas'; // api rest fake
  getCausasExternas(): Observable<any> {
    return this.httpClient.get(this.urlCausasExternas)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
  
}
