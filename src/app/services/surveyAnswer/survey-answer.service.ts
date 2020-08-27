import { Injectable } from '@angular/core';
import {QuestionAnswer} from '../../model/question-answer.model';
import {HttpClient} from '@angular/common/http';
import {SurveyAnswer} from '../../model/survey-answer.model';

@Injectable({
  providedIn: 'root'
})
export class SurveyAnswerService {

  constructor(
      private httpClient: HttpClient
  ) { }

  addSurveyAnswer(surveyAnswer: SurveyAnswer) {
    return this.httpClient.post<{ name: string }>(
        'https://survey-app-1995.firebaseio.com/survey-answers.json', {
          ...surveyAnswer,
          id: null
        });
  }
}
