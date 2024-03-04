import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { GformServiceService } from '../service/gform-service.service';

@Component({
  selector: 'app-submit-component',
  templateUrl: './submit-component.component.html',
  styleUrls: ['./submit-component.component.css'],
})
export class SubmitComponentComponent implements OnInit {
  point: number = 0;
  constructor(private _submitservice: GformServiceService) {
    console.log(this._submitservice.userAnswers)
  }
  questions: any;
  // questions = this._submitservice.getQuestionsData();
  userAnswers: { [key: number]: string } = this._submitservice.userAnswer;
  userAnswers1:any [] = this._submitservice.userAnswers;
  userAnswers2:any [] = this._submitservice.userAnswers1;
  ngOnInit() {
    this._submitservice.getQuestions().subscribe((questions) => {
      this.questions = questions;
    });
    console.log(this.userAnswers1)
  }
  getResult(userAnswer: any, answer: any,i:number) {
    if(i>=8)
    {
      if(this.areArraysEqual(userAnswer, answer))
      {
          return 'correct';
      }
    }
    if (userAnswer === answer) {
      this.point++;
      return 'correct';
    } else {
      return 'incorrect';
    }
  }
   areArraysEqual(arr1: string[], arr2: string[]): boolean {
    if (arr1.length !== arr2.length) {
      return false;
    }
    const sortedArr1 = arr1.slice().sort();
    const sortedArr2 = arr2.slice().sort();
    for (let i = 0; i < sortedArr1.length; i++) {
      if (sortedArr1[i] !== sortedArr2[i]) {
        return false;
      }
    }
  
    return true;
  }
}
