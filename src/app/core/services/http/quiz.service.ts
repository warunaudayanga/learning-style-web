import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, take } from "rxjs";
import { IQuizCollection, IQuizUserAnswers } from "../../interfaces/models/quiz";
import { QuizType } from "../../enums/quiz-type.eum";
import { IQuiz, IQuizAnswer, IQuizChoice } from "../../interfaces/quiz.interfaces";
import { IStyleQuizResult } from "../../interfaces/result-quiz.interfaces";

export const QUIZ_URL = "quiz";
export const QUIZ_ANSWER_URL = "quiz-answer";

@Injectable({
    providedIn: "root",
})
export class QuizService {
    constructor(protected http: HttpClient) {}

    getQuizCollection<Quiz extends IQuiz<IQuizChoice>>(type: QuizType): Observable<IQuizCollection<Quiz>> {
        return this.http.get<IQuizCollection<Quiz>>(`${QUIZ_URL}/${type}`).pipe(take(1));
    }

    saveAnswers<Quiz extends IQuiz<IQuizChoice>>(
        type: QuizType,
        answers: IQuizAnswer[],
        result: IStyleQuizResult,
    ): Observable<IQuizUserAnswers<Quiz>> {
        return this.http.post<IQuizUserAnswers<Quiz>>(`${QUIZ_ANSWER_URL}/${type}`, { answers, result }).pipe(take(1));
    }

    getAnswers<Quiz extends IQuiz<IQuizChoice>>(type: QuizType): Observable<IQuizUserAnswers<Quiz>> {
        return this.http.get<IQuizUserAnswers<Quiz>>(`${QUIZ_ANSWER_URL}/${type}`).pipe(take(1));
    }
}
