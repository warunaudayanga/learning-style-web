/* eslint-disable */
// noinspection JSUnusedGlobalSymbols

import { computed, inject } from "@angular/core";
import {
    patchState,
    signalStore,
    withComputed,
    withMethods,
    withState
} from "@ngrx/signals";
import { withStorageSync } from "@angular-architects/ngrx-toolkit";
import { QuizCollection, QuizUserAnswers } from "../interfaces/models/quiz";
import { Quiz, QuizAnswers, QuizChoice } from "../interfaces/quiz.interfaces";
import { QuizType } from "../enums/quiz-type.eum";
import { QuizService } from "../services/http/quiz.service";
import { catchError, EMPTY, Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { QuizError } from "../enums/errors/quiz.error.enum";
import { HttpError } from "@hichchi/ngx-utils";


interface QuizStateModel {
    quizCollectionList: QuizCollection<Quiz<QuizChoice>>[];
    quizAnswersList: QuizAnswers[];
    quizAnswersDraftList: QuizAnswers[];
}

const initialState: QuizStateModel = {
    quizCollectionList: [],
    quizAnswersList: [],
    quizAnswersDraftList: [],
};

export const QuizState = signalStore(
    { providedIn: "root" },
    withState<QuizStateModel>(initialState),
    withStorageSync({ key: "quiz" }),
    withComputed((state) => ({
        emailVerified: computed(() => state.quizCollectionList()),
    })),
    withMethods((state, quizService = inject(QuizService)) => ({
        getQuiz(quizType: QuizType): QuizCollection<Quiz<QuizChoice>> | undefined {
            return state.quizCollectionList().find(list => list.type === quizType);
        },
        getQuizAnswers(quizType: QuizType): QuizAnswers | undefined {
            return state.quizAnswersList().find(list => list.quizType === quizType);
        },
        getQuizAnswersDraft(quizType: QuizType): QuizAnswers | undefined {
            return state.quizAnswersDraftList().find(list => list.quizType === quizType);
        },
        loadQuiz(quizType: QuizType): Observable<QuizCollection<Quiz<QuizChoice>> | null> {
            return quizService.getQuizCollection(quizType).pipe(
                tap(quizCollection => {
                    if (quizCollection) {
                        this.saveQuiz(quizCollection)
                    }
                }),
                catchError((err: HttpError) => {
                    if (err.error?.code !== QuizError.QUIZ_404_TYPE) {
                        console.error(err.error?.message || "Failed to load Questions!");
                    }
                    return EMPTY;
                }),
            );
        },
        saveQuiz(quizCollection: QuizCollection<Quiz<QuizChoice>>): void {
            patchState(state, data => {
                const collectionList = [...data.quizCollectionList];
                const index = collectionList.findIndex(list => list.type === quizCollection.type);
                if (index !== -1) {
                    collectionList.splice(index, 1, quizCollection);
                } else {
                    collectionList.push(quizCollection);
                }
                return { ...data, quizCollectionList: collectionList }
            });
        },
        saveQuizAnswers({quizType, answers}: { quizType: QuizType; answers: QuizUserAnswers<Quiz<QuizChoice>> }): void {
            patchState(state, data => {
                const answersList = [...data.quizAnswersList];
                const index = answersList.findIndex(list => list.quizType === quizType);
                const ans = {
                    quizType: quizType,
                    answers: answers.answers,
                    result: answers.result,
                    user: answers.user,
                };
                if (index !== -1) {
                    answersList.splice(index, 1, ans);
                } else {
                    answersList.push(ans);
                }

                return { ...data, quizAnswersList: answersList }
            });
        },
        saveQuizAnswersDraft(answers: QuizAnswers): void {
            patchState(state, data => {
                const answersDraftList = [...data.quizAnswersDraftList];
                const index = answersDraftList.findIndex(list => list.quizType === answers.quizType);
                if (index !== -1) {
                    answersDraftList.splice(index, 1, answers);
                } else {
                    answersDraftList.push(answers);
                }

                return { ...data, quizAnswersDraftList: answersDraftList }
            });
        },
        clearQuiz(quizType: QuizType): void {
            patchState(state, data => {
                const quizCollectionList = [...data.quizCollectionList].filter(list => list.type !== quizType);
                return { ...data, quizCollectionList: quizCollectionList }
            });
        },
        clearQuizAnswers(quizType: QuizType): void {
            patchState(state, data => {
                const answersList = [...data.quizAnswersList].filter(list => list.quizType !== quizType);
                return { quizAnswersList: answersList }
            });
        },
        clearQuizAnswersDraft(quizType: QuizType): void {
            patchState(state, data => {
                const answersDraftList = [...data.quizAnswersDraftList].filter(list => list.quizType !== quizType);
                return { quizAnswersDraftList: answersDraftList }
            });
        },
        clearState(): void {
            patchState(state, initialState);
        }
    })),
);
