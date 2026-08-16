export interface LoginRequest {
  login: string;
  password: string; // Note: DTO property in API is Password
}

export interface LoginResponse {
  authCookieName: string;
  sessionCode: string;
}

export interface SessionResponse {
  sessionID: number;
  loginID: number;
  sessionCode: string;
  dateUpdated: string;
  isLoggedIn: boolean;
}

