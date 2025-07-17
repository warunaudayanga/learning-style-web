import { Quiz, QuizAnswer, QuizAnswers, QuizChoice } from "./quiz.interfaces";
import { StyleCategory } from "../enums/style-category.enum";
import { QuizType } from "../enums/quiz-type.eum";

export interface ISelfRatingQuizChoiceExtendData {
    category: StyleCategory;
}

export interface SelfRatingQuizChoice extends QuizChoice {
    id: string;
    value: string;
    category: StyleCategory;
}

export interface SelfRatingQuiz extends Quiz<QuizChoice> {
    choices: SelfRatingQuizChoice[];
    choiceCategories: StyleCategory[];
    sequence: number;
}

export interface SelfRatingQuizResultSingledRecord {
    category?: StyleCategory;
    label?: string;
    count: number;
    percentage: number;
}

export interface SelfRatingQuizResultPairedRecord extends SelfRatingQuizResultSingledRecord {
    difference?: number;
    selectedCategory?: StyleCategory;
}

export interface SelfRatingQuizResultFinalRecord {
    categories?: StyleCategory[];
    label?: string;
    count: number;
    percentage: number;
}

export interface SelfRatingQuizResultSingle {
    activist: SelfRatingQuizResultSingledRecord;
    reflector: SelfRatingQuizResultSingledRecord;
    sensing: SelfRatingQuizResultSingledRecord;
    intuitive: SelfRatingQuizResultSingledRecord;
    visual: SelfRatingQuizResultSingledRecord;
    verbal: SelfRatingQuizResultSingledRecord;
    sequential: SelfRatingQuizResultSingledRecord;
    global: SelfRatingQuizResultSingledRecord;
}

export interface SelfRatingQuizResultPaired {
    activistReflector: SelfRatingQuizResultPairedRecord;
    sensingIntuitive: SelfRatingQuizResultPairedRecord;
    visualVerbal: SelfRatingQuizResultPairedRecord;
    sequentialGlobal: SelfRatingQuizResultPairedRecord;
}

export interface SelfRatingQuizResult {
    singled: SelfRatingQuizResultSingle;
    paired: SelfRatingQuizResultPaired;
    total: number;
    final: SelfRatingQuizResultFinalRecord;
}
// noinspection JSUnusedGlobalSymbols
export interface ISelfRatingQuizAnswers extends QuizAnswers {
    quizType: QuizType;
    answers: QuizAnswer[];
    result?: SelfRatingQuizResult;
}
