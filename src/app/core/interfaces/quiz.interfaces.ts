import { QuizType } from "../enums/quiz-type.eum";
import { IUser } from "./models";

export interface IQuizChoice {
    id: string;
    value: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [k: string]: any;
}

export interface IQuiz<QuizChoice extends IQuizChoice> {
    id: string;
    heading?: string;
    question: string;
    choices?: QuizChoice[];
    multiple?: boolean;
    answer?: QuizChoice[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [k: string]: any;
}

export interface IQuizAnswer {
    id: string;
    answer: { id: string; value: string }[];
}

export interface IQuizDraft {
    id: string;
    heading?: string;
    question?: string;
    choices?: IQuizChoice[];
    choice?: boolean;
    multiple?: boolean;
    answer?: IQuizChoice[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IQuizAnswers<QuizResult = any> {
    quizType: QuizType;
    answers: IQuizAnswer[];
    result?: QuizResult;
    user?: IUser;
}
