import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CovidService {

  // async getCovid(): Promise<any> {
  //   const res = await fetch('http://localhost:3000/data_covid_estados');
  //   const json = await res.json();
  //   console.log('retorno service');
  //   console.log(json);
  //   return res;
  // }

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  // Obtem todos os dados
  urlCovid = 'http://localhost:3000/data_covid_estados'; // api rest fake
  getCovid(): Observable<any> {
    return this.httpClient.get(this.urlCovid)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  // Obtem todos os dados
  urlHistorico = 'http://localhost:3000/data_covid_brasil_historico'; // api rest fake
  getHistorico(): Observable<any> {
    return this.httpClient.get(this.urlHistorico)
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
