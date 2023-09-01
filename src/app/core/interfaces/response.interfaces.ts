export interface Response<Code = string> {
    status: number;
    message: string;
    code: Code;
}

export interface ErrorResponse<Enum = unknown> extends Response<Enum> {
    status: number;
    message: string;
    code: Enum;
}

export interface SuccessResponse extends Response {
    status: 200 | 201;
    code: "SUCCESS";
    message: string;
}

export interface HttpError<Enum = unknown> {
    status: number;
    message: string;
    error?: ErrorResponse<Enum>;
}
