import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {Question} from '../../model/question.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LoadingController} from '@ionic/angular';
import {SurveyAnswerService} from '../../services/surveyAnswer/survey-answer.service';
import {Survey} from '../../model/survey.model';
import {QuestionAnswer} from '../../model/question-answer.model';
import {SurveyAnswer} from '../../model/survey-answer.model';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.page.html',
  styleUrls: ['./questions.page.scss'],
})
export class QuestionsPage implements OnInit {
  survey: Survey;
  questions: Question[];
  questionAnswers: QuestionAnswer[] = [];
  form: FormGroup;
  questionIndex = 0;
  @ViewChild('ratingCtrl') ratingCtrl: HTMLIonInputElement;
  @ViewChild('textCtrl') textCtrl: HTMLIonInputElement;
  @ViewChild('numberCtrl') numberCtrl: HTMLIonInputElement;
  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private surveyAnswerService: SurveyAnswerService,
      private loadingController: LoadingController,
  ) {}

  ngOnInit() {
    const survey = this.route.snapshot.queryParamMap.get('survey');
    if (survey === null) {
      this.survey = null;
      this.questions = new Array<Question>();
    } else {
      this.survey = JSON.parse(survey);
      this.questions = this.survey.questions;
    }
    this.initForm();
    console.log(this.form);
  }

  initForm() {
    this.form = new FormGroup({
      rating: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      text: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      number: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      })
    });
  }

  onRating(ratingValue: number) {
    this.form.patchValue({rating: ratingValue});
  }

  back() {
    this.questionIndex = --this.questionIndex;
  }

  next() {
    this.fillQuestionAnswers();
    console.log(this.questionAnswers);
    this.initForm();
    this.questionIndex = ++this.questionIndex;
  }

  onSubmitSurvey() {
    this.fillQuestionAnswers();
    console.log(this.questionAnswers);

    this.loadingController
        .create({
          message: 'Saving Survey...'
        })
        .then(loadingEl => {
          loadingEl.present();
          this.surveyAnswerService.addSurveyAnswer(
              new SurveyAnswer(
                  this.survey.id,
                  this.survey.colorTheme,
                  this.survey.name,
                  this.survey.description,
                  this.survey.welcomeMessage,
                  this.survey.logo,
                  this.survey.dataLoaded,
                  this.questionAnswers,
                  this.survey.thankYouMessage,
                  this.survey.endUrl,
              )
          )
              .subscribe(() => {
                loadingEl.dismiss();
                this.form.reset();
                const queryParams: any = {};
                queryParams.survey = JSON.stringify(this.survey);
                const navigationExtras: NavigationExtras = {
                  queryParams
                };
                this.router.navigate(['/leave'], navigationExtras);
              }, error =>  {
                console.log(error);
              });
        });
  }

  fillQuestionAnswers() {
    const text = this.form.value.text;
    const rating = this.form.value.rating;
    const num = this.form.value.number;
    if (this.questions[this.questionIndex].type === 'text') {
      this.questionAnswers.push(new QuestionAnswer(this.questions[this.questionIndex].name, text));
    } else if (this.questions[this.questionIndex].type === 'number') {
      this.questionAnswers.push(new QuestionAnswer(this.questions[this.questionIndex].name, num));
    } else if (this.questions[this.questionIndex].type === 'rating') {
      this.questionAnswers.push(new QuestionAnswer(this.questions[this.questionIndex].name, rating));
    }
  }

}
