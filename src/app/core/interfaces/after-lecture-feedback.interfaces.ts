import { AfterLectureFeedbackResponse } from "../types/after-lecture-feedback.types";

export interface IAfterLectureFeedbackResult {
    responses: AfterLectureFeedbackResponse;
    weightedAverage: number;
}
