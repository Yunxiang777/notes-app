// 註冊請求
export interface IRegisterRequest {
    email: string;
    password: string;
}

// 註冊響應
export interface IRegisterResponse {
    user: {
        id: number;
        email: string;
    };
    token: string;
}

// 登入請求
export interface ILoginRequest {
    email: string;
    password: string;
}

// 登入響應
export interface ILoginResponse {
    user: {
        id: number;
        email: string;
    };
    token: string;
}