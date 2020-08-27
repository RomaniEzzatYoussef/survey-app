export class Question {
    constructor(
        public pageNumber: string,
        public pageName: string,
        public questionId: string,
        public name: string,
        public type: string,
        public required: boolean,
        public defaultValue: string,
    ) {}

}
