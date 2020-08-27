import { TestBed } from '@angular/core/testing';

import { SurveyAnswerService } from './survey-answer.service';

describe('QuestionsAnswersService', () => {
  let service: SurveyAnswerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SurveyAnswerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
