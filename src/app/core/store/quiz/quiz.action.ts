import { Quiz, QuizAnswers, QuizChoice } from "../../interfaces/quiz.interfaces";
import { QuizType } from "../../enums/quiz-type.eum";
import { QuizCollection, QuizUserAnswers } from "../../interfaces/models/quiz";

export class LoadQuiz {
    static readonly type = "[Quiz] LoadQuizAnswers";

    constructor(public payload: QuizType) {}
}

export class SaveQuiz {
    static readonly type = "[Quiz] SaveQuiz";

    constructor(public payload: QuizCollection<Quiz<QuizChoice>>) {}
}

export class SaveQuizAnswers {
    static readonly type = "[Quiz] SaveQuizAnswers";

    constructor(public payload: { quizType: QuizType; answers: QuizUserAnswers<Quiz<QuizChoice>> }) {}
}

export class SaveQuizAnswersDraft {
    static readonly type = "[Quiz] SaveQuizAnswersDraft";

    constructor(public payload: QuizAnswers) {}
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
