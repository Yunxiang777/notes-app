import { RowDataPacket } from "mysql2";

// 查詢 email 是否存在
export interface ExistingUserRow extends RowDataPacket {
    id: number;
}

// 查詢完整使用者資料（登入用）
export interface UserRow extends RowDataPacket {
    id: number;
    email: string;
    password_hash: string;
}
