import { QuizType } from "../enums/quiz-type.eum";
import { User } from "./models";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface QuizChoiceExtender<Extend extends { [k: string]: any }> {
    label: string;
    extend: Extend;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface QuizChoiceExtenders<Extend extends { [k: string]: any } = any> {
    key: keyof Extend;
    width?: string;
    items: QuizChoiceExtender<Extend>[];
}

export interface QuizChoice {
    id: string;
    value: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [k: string]: any;
}

export interface Quiz<QC extends QuizChoice> {
    id: string;
    heading?: string;
    question: string;
    choices?: QC[];
    multiple?: boolean;
    answer?: QC[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [k: string]: any;
}

export interface QuizAnswer {
    id: string;
    answer: { id: string; value: string }[];
}

export interface QuizDraft {
    id: string;
    heading?: string;
    question?: string;
    choices?: QuizChoice[];
    choice?: boolean;
    multiple?: boolean;
    answer?: QuizChoice[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface QuizAnswers<QuizResult = any> {
    quizType: QuizType;
    answers: QuizAnswer[];
    result?: QuizResult;
    user?: User;
}
