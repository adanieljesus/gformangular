import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GformServiceService {
  private apiUrl = 'http://localhost:3000/questions';
  constructor(private http: HttpClient) {}

  userAnswer = {};
  userAnswers = [];
  userAnswers1 = [];

  getQuestions(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // updateData(questions: any): Observable<any> {
  //   const url = `${this.apiUrl}/${questions.id}`;
  //   return this.http.put<any>(url, questions.id);
  // }
}
