import { api } from './api';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
  email: string;
  fullName: string;
}

export interface AuthResponse {
  token: string;
  message?: string;
  user?: {
    username: string;
    email: string;
    fullName: string;
  };
}

class AuthService {
  async login(username: string, password: string) {
    const response = await api.post<AuthResponse>('/auth/login', {
      username,
      password,
    });
    return response;
  }

  async register(userData: RegisterRequest) {
    const response = await api.post<AuthResponse>('/auth/register', userData);
    return response;
  }

  setAuthToken(token: string) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  removeAuthToken() {
    delete api.defaults.headers.common['Authorization'];
  }
}

export const authService = new AuthService();
