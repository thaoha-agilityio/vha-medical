import { auth } from '@/config/auth';
import { API_URL, AUTH_TOKEN } from '@/constants';

interface IApiClient {
  baseURL: string;
  headers?: HeadersInit;
}

interface RequestInitExtended extends Omit<RequestInit, 'body'> {
  body?: object | null;
}

export class ApiClient {
  baseURL: string;
  config: RequestInit;
  private static apiClientInstance: ApiClient;

  private constructor(baseURL: string, config: RequestInit) {
    this.baseURL = baseURL;
    this.config = config;
  }

  static create(params: IApiClient): ApiClient {
    const { baseURL, headers = { Authorization: `Bearer ${AUTH_TOKEN}` } } =
      params;

    if (!this.apiClientInstance)
      this.apiClientInstance = new ApiClient(baseURL, { headers });

    return this.apiClientInstance;
  }

  async apiClientSession(config: RequestInit = {}) {
    const session = await auth();
    if (!session?.user) {
      throw new Error('Not found user!');
    }

    const { token } = session.user;

    return new ApiClient(API_URL, {
      ...this.config,
      ...config,
      headers: {
        Authorization: `Bearer ${token}`,
        ...config.headers,
      },
    });
  }

  async get<T>(url: string, config: RequestInit = {}): Promise<T> {
    const response = await this.fetchWithConfig(url, config);
    if (!response.ok) {
      const errorText = await response.text();

      return {
        error: errorText,
      } as T;
    }
    const data: T = await response.json();
    return data;
  }

  async post<T>(url: string, config: RequestInitExtended = {}): Promise<T> {
    const response = await this.fetchWithConfig(url, {
      ...config,
      method: 'POST',
      body: JSON.stringify(config.body),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();

      return {
        error: errorText,
      } as T;
    }

    const data: T = await response.json();
    return data;
  }

  async postFile<T>(url: string, config: RequestInit = {}): Promise<T> {
    const response = await this.fetchWithConfig(url, {
      ...config,
      method: 'POST',
      body: config.body,
    });

    if (!response.ok) {
      const errorText = await response.text();

      return {
        error: errorText,
      } as T;
    }

    const data: T = await response.json();
    return data;
  }

  async put<T>(url: string, config: RequestInitExtended = {}): Promise<T> {
    const response = await this.fetchWithConfig(url, {
      ...config,
      method: 'PUT',
      body: JSON.stringify(config.body),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();

      return {
        error: errorText,
      } as T;
    }

    const data: T = await response.json();
    return data;
  }

  async delete<T>(url: string, config?: RequestInit): Promise<T> {
    const response = await this.fetchWithConfig(url, {
      ...config,
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorText = await response.text();

      return {
        error: errorText,
      } as T;
    }

    const data: T = await response.json();
    return data;
  }

  fetchWithConfig(url: string, config?: RequestInit) {
    return fetch(`${this.baseURL}${url}`, {
      ...this.config,
      ...config,
      headers: {
        ...this.config.headers,
        ...config?.headers,
      },
    });
  }
}

export const apiClient = ApiClient.create({
  baseURL: API_URL,
});
