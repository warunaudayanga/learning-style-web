import { IQuiz, IQuizAnswers, IQuizChoice } from "../../interfaces/quiz.interfaces";
import { QuizType } from "../../enums/quiz-type.eum";
import { IQuizCollection, IQuizUserAnswers } from "../../interfaces/models/quiz";

export class LoadQuiz {
    static readonly type = "[Quiz] LoadQuizAnswers";

    constructor(public payload: QuizType) {}
}

export class SaveQuiz {
    static readonly type = "[Quiz] SaveQuiz";

    constructor(public payload: IQuizCollection<IQuiz<IQuizChoice>>) {}
}

export class SaveQuizAnswers {
    static readonly type = "[Quiz] SaveQuizAnswers";

    constructor(public payload: { quizType: QuizType; answers: IQuizUserAnswers<IQuiz<IQuizChoice>> }) {}
}

export class SaveQuizAnswersDraft {
    static readonly type = "[Quiz] SaveQuizAnswersDraft";

    constructor(public payload: IQuizAnswers) {}
}

export class ClearQuiz {
    static readonly type = "[Quiz] ClearQuiz";

    constructor(public payload: QuizType) {}
}

export class ClearQuizAnswers {
    static readonly type = "[Quiz] ClearQuizAnswers";

    constructor(public payload: QuizType) {}
}

export class ClearQuizAnswersDraft {
    static readonly type = "[Quiz] ClearQuizAnswersDraft";

    constructor(public payload: QuizType) {}
}
