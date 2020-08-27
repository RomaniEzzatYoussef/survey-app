import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Survey} from '../../model/survey.model';
import {HttpClient} from '@angular/common/http';
import {map, switchMap, take, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  private _survey = new BehaviorSubject<Survey>(null);

  get survey() {
    return this._survey.asObservable();
  }

  constructor(
      private httpClient: HttpClient
  ) { }

  getSurvey(id: string) {
    return this.httpClient.get<Survey>(`https://survey-app-1995.firebaseio.com/surveys/${id}.json`)
        .pipe(
            take(1),
            map(resData => {
              return resData;
            }),
            tap(survey => {
              this._survey.next(survey);
            })
        );
  }
}
