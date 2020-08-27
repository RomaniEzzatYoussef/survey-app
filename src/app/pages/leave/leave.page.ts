import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Survey} from '../../model/survey.model';

@Component({
  selector: 'app-leave',
  templateUrl: './leave.page.html',
  styleUrls: ['./leave.page.scss'],
})
export class LeavePage implements OnInit {
  survey: Survey;
  constructor(
      private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    const survey = this.route.snapshot.queryParamMap.get('survey');
    if (survey === null) {
      this.survey = null;
    } else {
      this.survey = JSON.parse(survey);
    }
  }

  onLeave() {
    window.location.href = this.survey.endUrl;
  }
}
