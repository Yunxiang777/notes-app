// src/config/constants.ts

export const AUTH_SCHEME = "Bearer";

export const ERROR_MESSAGES = {
    MISSING_HEADER: "Missing authorization header",
    INVALID_FORMAT: `Invalid token format. Must be '${AUTH_SCHEME} <token>'`,
    INVALID_TOKEN: "Invalid or expired token",
    INVALID_PAYLOAD: "Invalid token payload structure",
    INTERNAL_ERROR: "Internal server error during authentication"
};