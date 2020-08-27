import {Component, OnDestroy, OnInit} from '@angular/core';
import {Survey} from '../../model/survey.model';
import {Subscription} from 'rxjs';
import {SurveyService} from '../../services/survey/survey.service';
import {NavigationExtras, Router} from '@angular/router';
import {DataLoaded} from '../../model/data-loaded.model';
import {Question} from '../../model/question.model';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit, OnDestroy {
  dataLoaded: DataLoaded = new DataLoaded('0222585965', 'romaniezzat@hotmail.com', 'Romani Ezzat');
  questions: Question[] = [];
  survey: Survey = new Survey(
      '01',
      '#3dc2ff',
      'Food & Beverage',
      'food and beverage survey',
      'Welcome to Mahaba House',
      'https://2.bp.blogspot.com/-eDdqBqMy7IE/U4c78RATpdI/AAAAAAAADYk/_RKjrEERqvY/s1600/MAHABA+WEB+OFFICIAL.jpg',
      this.dataLoaded,
      this.questions,
      'Thanks for rating us.',
      ''

  );
  private surveySubscription: Subscription;

  constructor(
      private surveyService: SurveyService,
      private router: Router,
  ) {}

  ngOnInit(): void {
    this.surveySubscription = this.surveyService.getSurvey('01').subscribe(survey => {
      this.survey = survey;
      console.log(survey);
    });
  }

  ionViewWillEnter() {
    this.surveyService.survey.subscribe();
  }

  onStart() {
    const queryParams: any = {};
    queryParams.survey = JSON.stringify(this.survey);
    const navigationExtras: NavigationExtras = {
      queryParams
    };
    this.router.navigate(['/questions'], navigationExtras);
  }

  ngOnDestroy(): void {
    if (this.surveySubscription) {
      this.surveySubscription.unsubscribe();
    }
  }

}
