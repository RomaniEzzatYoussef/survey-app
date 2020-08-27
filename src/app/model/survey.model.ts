import {DataLoaded} from './data-loaded.model';
import {Question} from './question.model';

export class Survey {
    constructor(
            public id: string,
            public colorTheme: string,
            public name: string,
            public description: string,
            public welcomeMessage: string,
            public logo: string,
            public dataLoaded: DataLoaded,
            public questions: Question[],
            public thankYouMessage: string,
            public endUrl: string,
    ) {}
}
