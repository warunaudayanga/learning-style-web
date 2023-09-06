import { IBaseModel } from "./base-model";
import { UserRole } from "../../enums/user-role.enum";
import { IQuizUserAnswers } from "./quiz";

export interface IUser extends IBaseModel {
    name: string;
    username: string;
    role: UserRole;
    regNo: string;
    dob: string;
    gender: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    answers?: IQuizUserAnswers<any>[];
}
