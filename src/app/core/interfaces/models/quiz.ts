import { QuizType } from "../../enums/quiz-type.eum";
import { IQuiz, IQuizAnswer, IQuizChoice } from "../quiz.interfaces";
import { IUser } from "./user";
import { IBaseModel } from "./base-model";

export interface IQuizCollection<Quiz extends IQuiz<IQuizChoice>> extends IBaseModel {
    id: string;
    type: QuizType;
    quizzes: Quiz[];
    answers: IQuizAnswer[];
    userAnswers: IQuizAnswer[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IQuizUserAnswers<Quiz extends IQuiz<IQuizChoice>, QuizResult = any> extends IBaseModel {
    quizCollection: IQuizCollection<Quiz>;
    quizCollectionId: number;
    user: IUser;
    userId: number;
    answers: IQuizAnswer[];
    result: QuizResult;
}
