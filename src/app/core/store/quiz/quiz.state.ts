import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { SaveQuizAnswers, SaveAssessmentDrafts, ClearAssessmentDraft, ClearQuizAnswers, InitQuizState } from "./quiz.action";
import { deepCopy } from "hichchi-utils";
import { AssessmentDraft, QuizAnswerList } from "../../interfaces/quiz.interfaces";

interface QuizStateModel {
    quizAnswerLists: QuizAnswerList[];
    assessmentDrafts: AssessmentDraft[];
}

@State<QuizStateModel>({
    name: "quiz",
    defaults: {
        quizAnswerLists: [],
        assessmentDrafts: [],
    },
})
@Injectable()
export class QuizState {
    @Selector()
    static getQuizAnswerList(state: QuizStateModel): (assessmentId: number) => QuizAnswerList | undefined {
        return (assessmentId: number): QuizAnswerList | undefined => {
            return deepCopy(state.quizAnswerLists.find(list => list.assessmentId === assessmentId));
        };
    }

    @Selector()
    static getQuizAnswerLists(state: QuizStateModel): AssessmentDraft[] {
        return deepCopy(state.assessmentDrafts);
    }

    @Selector()
    static getAssessmentDraft(state: QuizStateModel): (classRoomId: number) => AssessmentDraft | undefined {
        return (classRoomId: number): AssessmentDraft | undefined => {
            return deepCopy(state.assessmentDrafts.find(list => list.classRoomId === classRoomId));
        };
    }

    @Selector()
    static getAssessmentDrafts(state: QuizStateModel): AssessmentDraft[] {
        return deepCopy(state.assessmentDrafts);
    }

    // noinspection JSUnusedLocalSymbols
    @Action(InitQuizState)
    initState({ setState }: StateContext<QuizStateModel>, _action: InitQuizState): void {
        setState({ quizAnswerLists: [], assessmentDrafts: [] });
    }

    @Action(SaveQuizAnswers)
    saveQuizAnswers({ patchState, getState }: StateContext<QuizStateModel>, action: SaveQuizAnswers): void {
        const quizAnswerLists = [...getState().quizAnswerLists];
        const index = quizAnswerLists.findIndex(list => list.assessmentId === action.payload.assessmentId);
        if (index !== -1) {
            quizAnswerLists.splice(index, 1, action.payload);
        } else {
            quizAnswerLists.push(action.payload);
        }
        patchState({ quizAnswerLists: deepCopy(quizAnswerLists) });
    }

    @Action(SaveAssessmentDrafts)
    saveAssessmentDrafts({ patchState, getState }: StateContext<QuizStateModel>, action: SaveAssessmentDrafts): void {
        const assessmentDrafts = [...getState().assessmentDrafts];
        const index = assessmentDrafts.findIndex(list => list.classRoomId === action.payload.classRoomId);
        if (index !== -1) {
            assessmentDrafts.splice(index, 1, action.payload);
        } else {
            assessmentDrafts.push(action.payload);
        }
        patchState({ assessmentDrafts: deepCopy(assessmentDrafts) });
    }

    @Action(ClearQuizAnswers)
    clearQuizAnswers({ patchState, getState }: StateContext<QuizStateModel>, action: ClearQuizAnswers): void {
        const assessmentDrafts = [...getState().quizAnswerLists].filter(list => list.assessmentId !== action.payload);
        patchState({ quizAnswerLists: deepCopy(assessmentDrafts) });
    }

    @Action(ClearAssessmentDraft)
    clearQuizDrafts({ patchState, getState }: StateContext<QuizStateModel>, action: ClearAssessmentDraft): void {
        const assessmentDrafts = [...getState().assessmentDrafts].filter(list => list.classRoomId !== action.payload);
        patchState({ assessmentDrafts: deepCopy(assessmentDrafts) });
    }
}
