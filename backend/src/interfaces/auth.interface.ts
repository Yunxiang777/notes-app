/**
 * 用戶資料的介面定義
 * 這定義了用戶在資料庫中的完整結構
 */
export interface IUser {
    id: number;
    email: string;
    passwordHash: string;
    createdAt: Date;
    updatedAt: Date;
}

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