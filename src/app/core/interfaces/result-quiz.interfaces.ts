import { IQuiz, IQuizAnswer, IQuizAnswers, IQuizChoice } from "./quiz.interfaces";
import { StyleCategory } from "../enums/style-category.enum";
import { QuizType } from "../enums/quiz-type.eum";

export interface IStyleQuizChoice extends IQuizChoice {
    id: string;
    value: string;
    category: StyleCategory;
}

export interface IStyleQuiz extends IQuiz<IQuizChoice> {
    choices: IStyleQuizChoice[];
    choiceCategories: StyleCategory[];
    sequence: number;
}

export interface IStyleQuizResultSingledRecord {
    category?: StyleCategory;
    label?: string;
    count: number;
    percentage: number;
}

export interface IStyleQuizResultPairedRecord extends IStyleQuizResultSingledRecord {
    difference?: number;
    selectedCategory?: StyleCategory;
}

export interface IStyleQuizResultFinalRecord {
    category?: StyleCategory;
    label?: string;
    count: number;
    percentage: number;
}

export interface IStyleQuizResultSingle {
    activist: IStyleQuizResultSingledRecord;
    reflector: IStyleQuizResultSingledRecord;
    sensing: IStyleQuizResultSingledRecord;
    intuitive: IStyleQuizResultSingledRecord;
    visual: IStyleQuizResultSingledRecord;
    verbal: IStyleQuizResultSingledRecord;
    sequential: IStyleQuizResultSingledRecord;
    global: IStyleQuizResultSingledRecord;
}

export interface IStyleQuizResultPaired {
    activistReflector: IStyleQuizResultPairedRecord;
    sensingIntuitive: IStyleQuizResultPairedRecord;
    visualVerbal: IStyleQuizResultPairedRecord;
    sequentialGlobal: IStyleQuizResultPairedRecord;
}

export interface IStyleQuizResult {
    singled: IStyleQuizResultSingle;
    paired: IStyleQuizResultPaired;
    total: number;
}
// noinspection JSUnusedGlobalSymbols
export interface IStyleQuizAnswers extends IQuizAnswers {
    quizType: QuizType;
    answers: IQuizAnswer[];
    result?: IStyleQuizResult;
}
