export interface QuizAnswer {
    id: string;
    answer: string[];
}

export interface Quiz {
    id: string;
    heading?: string;
    question: string;
    options?: string[];
    multiple?: boolean;
    answer?: string[];
}

export interface QuizDraft {
    id: string;
    heading?: string;
    question?: string;
    options?: { id: string; value: string }[];
    choice?: boolean;
    multiple?: boolean;
    answer?: (string | undefined)[];
}

export interface QuizAnswerList {
    assessmentId: number;
    answers: QuizAnswer[];
}

export interface AssessmentDraft {
    classRoomId: number;
    name?: string;
    description?: string;
    passMarks?: number;
    startTime?: string;
    endTime?: string;
    drafts?: QuizDraft[];
}
