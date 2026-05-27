import { API_BASE_URL } from './endpoints';
import { AppError } from '../../core/errors/AppError';

class ApiClient {
  constructor() {
    this.baseUrl = API_BASE_URL;
    this.accessToken = null;
  }

  setToken(token) {
    this.accessToken = token;
  }

  async request(method, path, body) {
    const headers = { 'Content-Type': 'application/json' };
    if (this.accessToken) headers['Authorization'] = `Bearer ${this.accessToken}`;

    const response = await fetch(`${this.baseUrl}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      if (response.status === 401) throw new AppError('UNAUTHORIZED', 'Session expired', 401);
      throw new AppError('UNKNOWN_ERROR', `Request failed: ${response.status}`, response.status);
    }

    return response.json();
  }

  get(path) { return this.request('GET', path); }
  post(path, body) { return this.request('POST', path, body); }
  put(path, body) { return this.request('PUT', path, body); }
  patch(path, body) { return this.request('PATCH', path, body); }
  delete(path) { return this.request('DELETE', path); }
}

export const apiClient = new ApiClient();
