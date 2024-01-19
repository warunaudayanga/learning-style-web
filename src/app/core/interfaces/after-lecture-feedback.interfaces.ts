import { IAfterLectureFeedbackResponse } from "../types/after-lecture-feedback.types";

export interface IAfterLectureFeedbackResult {
    responses: IAfterLectureFeedbackResponse;
    weightedAverage: number;
}
