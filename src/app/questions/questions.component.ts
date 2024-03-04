import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GformServiceService } from '../service/gform-service.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
})
export class QuestionsComponent implements OnInit {
  filter_source_type_value = null;
  questions: any;
  constructor(
    private _gormservice: GformServiceService,
    private router: Router
  ) {}
  ngOnInit(): void {
    // this.questions = this._gormservice.getQuestionsData();
    this._gormservice.getQuestions().subscribe((questions) => {
      this.questions = questions;
    });
  }

  currentQuestionNo: number = 0;
  userAnswers: { [key: number]: string } = {};
  answer = '';
  selectedIndex = '';

  optionClicked(options: any, questionIndex: any) {
    this.userAnswers[questionIndex] = options;
  }

  preQues() {
    if (this.currentQuestionNo + 1 > 0) {
      this.currentQuestionNo--;
      this.loadAnswer();
    }
  }
  checkedOptions: { [key: string]: boolean } = {};
 checkopt:any=[];
 checkopt1:any=[];
  updateCheckedOptions(option: string,i:number): void {
    console.log(i)
    if(i==8)
    {
      if(this.checkedOptions[option])
    {
      if(!this.checkopt.includes(option))
      this.checkopt.push(option)
    }
    else{
      if(this.checkopt.includes(option))
      this.checkopt.splice(this.checkopt.indexOf(option),1)
    }
    }
    else{
      if(this.checkedOptions[option])
    {
      if(!this.checkopt1.includes(option))
      this.checkopt1.push(option)
    }
    else{
      if(this.checkopt1.includes(option))
      this.checkopt1.splice(this.checkopt1.indexOf(option),1)
    }
    }
    
  }

  loadAnswer() {
    let question = this.questions[this.currentQuestionNo];
    let oldAnswer = this.userAnswers[question.id];
    if (oldAnswer) {
      let previousAnswerIndex = this.questions[
        this.currentQuestionNo
      ].options.findIndex((res: any) => res == oldAnswer);
      this.selectedIndex = '' + previousAnswerIndex;
    } else {
      this.selectedIndex = '';
    }
  }

  submitAnswers() {
    this.selectedIndex = '';
    if (this.currentQuestionNo + 1 < this.questions.length) {
      this.currentQuestionNo++;
      this.loadAnswer();
    } else {
      this._gormservice.userAnswer = this.userAnswers;
      this._gormservice.userAnswers = this.checkopt;
      this._gormservice.userAnswers1 = this.checkopt1;
      this.router.navigateByUrl('/submit');
    }
  }

  clear() {
    this.selectedIndex = '';
  }

  checkAnswer() {
    this.questions.forEach((question: any) => {
      const selectedOption = question.selectedOption;
      const correctAnswer = question.correctAnswer;
      const isCorrect = this.compareArray(selectedOption, correctAnswer);
      console.log('Question:', question.question);
      console.log('selectedoption', selectedOption);
      console.log('iscorrect:', isCorrect);
    });
  }

  compareArray(arr1: any[], arr2: any[]): boolean {
    if (arr1.length !== arr2.length) {
      return false;
    }
    return arr1.every((option) => arr2.includes(option));
  }
}
