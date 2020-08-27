import {DataLoaded} from './data-loaded.model';
import {QuestionAnswer} from './question-answer.model';

export class SurveyAnswer {
    constructor(
        public id: string,
        public colorTheme: string,
        public name: string,
        public description: string,
        public welcomeMessage: string,
        public logo: string,
        public dataLoaded: DataLoaded,
        public questions: QuestionAnswer[],
        public thankYouMessage: string,
        public endUrl: string,
    ) {}
}
