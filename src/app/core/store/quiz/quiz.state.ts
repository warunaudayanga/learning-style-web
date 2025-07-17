import { Injectable, NgZone } from "@angular/core";
import { Action, NgxsOnInit, Selector, State, StateContext, Store } from "@ngxs/store";
import {
    SaveQuizAnswersDraft,
    ClearQuizAnswersDraft,
    SaveQuizAnswers,
    ClearQuizAnswers,
    LoadQuiz,
    SaveQuiz,
    ClearQuiz,
} from "./quiz.action";
import { deepCopy } from "hichchi-utils";
import { Quiz, QuizAnswers, QuizChoice } from "../../interfaces/quiz.interfaces";
import { ClearState } from "../shared/state.actions";
import { QuizType } from "../../enums/quiz-type.eum";
import { QuizService } from "../../services/http/quiz.service";
import { catchError, Observable, of, take } from "rxjs";
import { tap } from "rxjs/operators";
import { HttpError } from "../../interfaces";
import { QuizCollection } from "../../interfaces/models/quiz";
import { AppService } from "../../../app.service";
import { QuizError } from "../../enums/errors/quiz.error.enum";

interface QuizStateModel {
    quizCollectionList: QuizCollection<Quiz<QuizChoice>>[];
    quizAnswersList: QuizAnswers[];
    quizAnswersDraftList: QuizAnswers[];
}

@State<QuizStateModel>({
    name: "quiz",
    defaults: {
        quizCollectionList: [],
        quizAnswersList: [],
        quizAnswersDraftList: [],
    },
})
@Injectable()
export class QuizState implements NgxsOnInit {
    constructor(
        private readonly store: Store,
        private readonly ngZone: NgZone,
        private readonly app: AppService,
        private readonly quizService: QuizService,
    ) {}

    ngxsOnInit({ getState, patchState }: StateContext<QuizStateModel>): void {
        if (!getState().quizCollectionList?.length) {
            patchState({ quizCollectionList: [] });
        }
        if (!getState().quizAnswersList?.length) {
            patchState({ quizAnswersList: [] });
        }
        if (!getState().quizAnswersDraftList?.length) {
            patchState({ quizAnswersDraftList: [] });
        }
    }

    @Selector()
    static getQuiz(state: QuizStateModel): (quizType: QuizType) => QuizCollection<Quiz<QuizChoice>> | undefined {
        return (quizType: QuizType): QuizCollection<Quiz<QuizChoice>> | undefined => {
            return deepCopy(state.quizCollectionList.find(list => list.type === quizType));
        };
    }

    @Selector()
    static getQuizAnswers(state: QuizStateModel): (quizType: QuizType) => QuizAnswers | undefined {
        return (quizType: QuizType): QuizAnswers | undefined => {
            return deepCopy(state.quizAnswersList.find(list => list.quizType === quizType));
        };
    }

    @Selector()
    static getQuizAnswersDraft(state: QuizStateModel): (quizType: QuizType) => QuizAnswers | undefined {
        return (quizType: QuizType): QuizAnswers | undefined => {
            return deepCopy(state.quizAnswersDraftList.find(list => list.quizType === quizType));
        };
    }

    @Action(LoadQuiz)
    loadQuiz(
        _ctx: StateContext<QuizStateModel>,
        action: LoadQuiz,
    ): Observable<QuizCollection<Quiz<QuizChoice>> | null> {
        return this.quizService.getQuizCollection(action.payload).pipe(
            take(1),
            tap(quizCollection => {
                if (quizCollection) {
                    this.store.dispatch(new SaveQuiz(quizCollection));
                }
            }),
            catchError((err: HttpError<QuizError>) => {
                this.ngZone.run(() => {
                    if (err.error?.code !== QuizError.QUIZ_404_TYPE) {
                        this.app.error(err.error?.message || "Failed to load Questions!");
                    }
                });
                return of(null);
            }),
        );
    }

    @Action(SaveQuiz)
    saveQuiz({ patchState, getState }: StateContext<QuizStateModel>, action: SaveQuiz): void {
        const collectionList = [...getState().quizCollectionList];
        const index = collectionList.findIndex(list => list.type === action.payload.type);
        if (index !== -1) {
            collectionList.splice(index, 1, action.payload);
        } else {
            collectionList.push(action.payload);
        }
        patchState({ quizCollectionList: deepCopy(collectionList) });
    }

    @Action(SaveQuizAnswers)
    saveQuizAnswers({ patchState, getState }: StateContext<QuizStateModel>, action: SaveQuizAnswers): void {
        const answersList = [...getState().quizAnswersList];
        const index = answersList.findIndex(list => list.quizType === action.payload.quizType);
        const answers = {
            quizType: action.payload.quizType,
            answers: action.payload.answers.answers,
            result: action.payload.answers.result,
            user: action.payload.answers.user,
        };
        if (index !== -1) {
            answersList.splice(index, 1, answers);
        } else {
            answersList.push(answers);
        }
        patchState({ quizAnswersList: deepCopy(answersList) });
    }

    @Action(SaveQuizAnswersDraft)
    saveQuizAnswersDraft({ patchState, getState }: StateContext<QuizStateModel>, action: SaveQuizAnswersDraft): void {
        const answersDraftList = [...getState().quizAnswersDraftList];
        const index = answersDraftList.findIndex(list => list.quizType === action.payload.quizType);
        if (index !== -1) {
            answersDraftList.splice(index, 1, action.payload);
        } else {
            answersDraftList.push(action.payload);
        }
        patchState({ quizAnswersDraftList: deepCopy(answersDraftList) });
    }

    @Action(ClearQuiz)
    clearQuiz({ patchState, getState }: StateContext<QuizStateModel>, action: ClearQuiz): void {
        const quizCollectionList = [...getState().quizCollectionList].filter(list => list.type !== action.payload);
        patchState({ quizCollectionList: deepCopy(quizCollectionList) });
    }

    @Action(ClearQuizAnswers)
    clearQuizAnswers({ patchState, getState }: StateContext<QuizStateModel>, action: ClearQuizAnswers): void {
        const answersList = [...getState().quizAnswersList].filter(list => list.quizType !== action.payload);
        patchState({ quizAnswersList: deepCopy(answersList) });
    }

    @Action(ClearQuizAnswersDraft)
    clearQuizAnswersDraft({ patchState, getState }: StateContext<QuizStateModel>, action: ClearQuizAnswersDraft): void {
        const answersDraftList = [...getState().quizAnswersDraftList].filter(list => list.quizType !== action.payload);
        patchState({ quizAnswersDraftList: deepCopy(answersDraftList) });
    }

    @Action(ClearState)
    clearState({ setState }: StateContext<QuizStateModel>): void {
        setState({ quizCollectionList: [], quizAnswersList: [], quizAnswersDraftList: [] });
    }
}
