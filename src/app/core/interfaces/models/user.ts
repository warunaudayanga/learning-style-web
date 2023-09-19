import { IBaseModel } from "./base-model";
import { UserRole } from "../../enums/user-role.enum";
import { IQuizUserAnswers } from "./quiz";
import { DoneICT } from "../../enums/done-ict.enum";

export interface IUser extends IBaseModel {
    name: string;
    username: string;
    role: UserRole;
    regNo: string;
    dob: string;
    gender: string;
    email: string;
    cot: string;
    cotOther: string;
    olMaths: string;
    olScience: string;
    olEnglish: string;
    alStream: string;
    alOther: string;
    alPassed: boolean;
    doneIct: DoneICT;
    comAppAssist3: boolean;
    ict4: boolean;
    hardware4: boolean;
    network4: boolean;
    graphic4: boolean;
    icSupporter4: boolean;
    softwareDev4: boolean;
    followOther: boolean;
    followedOther: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    answers?: IQuizUserAnswers<any>[];
}
