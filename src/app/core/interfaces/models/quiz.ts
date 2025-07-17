import { QuizType } from "../../enums/quiz-type.eum";
import { Quiz, QuizAnswer, QuizAnswers, QuizChoice } from "../quiz.interfaces";
import { User } from "./user";
import { Model } from "@hichchi/nest-connector/crud";

export interface QuizCollection<Q extends Quiz<QuizChoice>> extends Model {
    type: QuizType;
    quizzes: Q[];
    answers: QuizAnswers[];
    userAnswers: QuizAnswer[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface QuizUserAnswers<Q extends Quiz<QuizChoice>, QuizResult = any> extends Model {
    quizCollection?: QuizCollection<Q>;
    quizCollectionId?: number;
    user: User;
    userId: number;
    answers: QuizAnswer[];
    result: QuizResult;
}
