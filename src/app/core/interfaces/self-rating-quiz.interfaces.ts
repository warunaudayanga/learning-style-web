import { IQuiz, IQuizAnswer, IQuizAnswers, IQuizChoice } from "./quiz.interfaces";
import { StyleCategory } from "../enums/style-category.enum";
import { QuizType } from "../enums/quiz-type.eum";

export interface ISelfRatingQuizChoiceExtendData {
    category: StyleCategory;
}

export interface ISelfRatingQuizChoice extends IQuizChoice {
    id: string;
    value: string;
    category: StyleCategory;
}

export interface ISelfRatingQuiz extends IQuiz<IQuizChoice> {
    choices: ISelfRatingQuizChoice[];
    choiceCategories: StyleCategory[];
    sequence: number;
}

export interface ISelfRatingQuizResultSingledRecord {
    category?: StyleCategory;
    label?: string;
    count: number;
    percentage: number;
}

export interface ISelfRatingQuizResultPairedRecord extends ISelfRatingQuizResultSingledRecord {
    difference?: number;
    selectedCategory?: StyleCategory;
}

export interface ISelfRatingQuizResultFinalRecord {
    categories?: StyleCategory[];
    label?: string;
    count: number;
    percentage: number;
}

export interface ISelfRatingQuizResultSingle {
    activist: ISelfRatingQuizResultSingledRecord;
    reflector: ISelfRatingQuizResultSingledRecord;
    sensing: ISelfRatingQuizResultSingledRecord;
    intuitive: ISelfRatingQuizResultSingledRecord;
    visual: ISelfRatingQuizResultSingledRecord;
    verbal: ISelfRatingQuizResultSingledRecord;
    sequential: ISelfRatingQuizResultSingledRecord;
    global: ISelfRatingQuizResultSingledRecord;
}

export interface ISelfRatingQuizResultPaired {
    activistReflector: ISelfRatingQuizResultPairedRecord;
    sensingIntuitive: ISelfRatingQuizResultPairedRecord;
    visualVerbal: ISelfRatingQuizResultPairedRecord;
    sequentialGlobal: ISelfRatingQuizResultPairedRecord;
}

export interface ISelfRatingQuizResult {
    singled: ISelfRatingQuizResultSingle;
    paired: ISelfRatingQuizResultPaired;
    total: number;
    final: ISelfRatingQuizResultFinalRecord;
}
// noinspection JSUnusedGlobalSymbols
export interface ISelfRatingQuizAnswers extends IQuizAnswers {
    quizType: QuizType;
    answers: IQuizAnswer[];
    result?: ISelfRatingQuizResult;
}
