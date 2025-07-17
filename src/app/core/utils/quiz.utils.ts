// noinspection JSUnusedGlobalSymbols

import { Quiz, QuizChoice, QuizDraft } from "../interfaces/quiz.interfaces";

export const mapChoiceId = (q: QuizChoice, _i: number, _array: QuizChoice[]): string => q.id;

export const mapChoiceValue = (q: QuizChoice, _i: number, _array: QuizChoice[]): string => q.value;

export const quizToDraft = (quiz: Quiz<QuizChoice>): QuizDraft => {
    const answer = quiz.answer?.map(ans => quiz.choices!.find(option => option.value === ans.value)!) ?? [];
    return {
        id: quiz.id,
        question: quiz.question,
        choice: Boolean(quiz.choices),
        multiple: quiz.multiple,
        choices: quiz.choices,
        answer,
    };
};

export const draftToQuiz = (draft: QuizDraft): Quiz<QuizChoice> => {
    return {
        id: draft.id,
        question: draft.question ?? "",
        choices: draft.choice ? draft.choices : undefined,
        multiple: draft.multiple,
        answer:
            draft.choices?.length && draft.answer?.length
                ? draft.answer.map(ans => draft.choices!.find(option => option.id === ans.id)!)
                : [],
    };
};
