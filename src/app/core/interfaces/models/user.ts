import { User as HcUser } from "@hichchi/nest-connector/auth";
import { UserRole } from "../../enums/user-role.enum";
import { QuizUserAnswers } from "./quiz";
import { DoneICT } from "../../enums/done-ict.enum";

export interface User extends HcUser<UserRole> {
    name: string;
    email: string;
    username: string;
    password: string;
    role: UserRole;
    regNo: string;
    dob: string;
    gender: string;
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
    answers: QuizUserAnswers<any>[];
}
