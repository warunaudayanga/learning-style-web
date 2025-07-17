import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, take } from "rxjs";
import { QuizCollection, QuizUserAnswers } from "../../interfaces/models/quiz";
import { QuizType } from "../../enums/quiz-type.eum";
import { Quiz, QuizAnswer, QuizChoice } from "../../interfaces/quiz.interfaces";
import { SelfRatingQuizResult } from "../../interfaces/self-rating-quiz.interfaces";

export const QUIZ_URL = "quiz";
export const QUIZ_ANSWER_URL = "quiz-answer";

@Injectable({
    providedIn: "root",
})
export class QuizService {
    constructor(protected http: HttpClient) {}

    getQuizCollection<Q extends Quiz<QuizChoice>>(type: QuizType, studentId?: string): Observable<QuizCollection<Q>> {
        return this.http.get<QuizCollection<Q>>(`${QUIZ_URL}/${type}?studentId=${studentId ?? ""}`).pipe(take(1));
    }

    saveQuizCollection<Q extends Quiz<QuizChoice>>(type: QuizType, quizzes: Q[]): Observable<QuizCollection<Q>> {
        return this.http.post<QuizCollection<Q>>(`${QUIZ_URL}`, { type, quizzes }).pipe(take(1));
    }

    saveAnswers<Q extends Quiz<QuizChoice>>(
        type: QuizType,
        answers: QuizAnswer[],
        result: SelfRatingQuizResult,
    ): Observable<QuizUserAnswers<Q>> {
        return this.http.post<QuizUserAnswers<Q>>(`${QUIZ_ANSWER_URL}/${type}`, { answers, result }).pipe(take(1));
    }

    getAnswers<Q extends Quiz<QuizChoice>>(type: QuizType): Observable<QuizUserAnswers<Q>> {
        return this.http.get<QuizUserAnswers<Q>>(`${QUIZ_ANSWER_URL}/${type}`).pipe(take(1));
    }
}
