const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
const API_VERSION = 'v1';

class ApiClient {
  private getBaseUrl(path: string): string {
    return `${API_BASE_URL}/api/${API_VERSION}${path}`;
  }

  private async request<T>(
    path: string,
    options: RequestInit = {}
  ): Promise<T> {
    const response = await fetch(this.getBaseUrl(path), {
      ...options,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || 'Request failed');
    }

    return response.json();
  }

  get<T>(path: string, options?: Omit<RequestInit, 'method' | 'body' | 'credentials'>): Promise<T> {
    return this.request<T>(path, { ...options, method: 'GET' });
  }

  post<T>(path: string, body?: unknown, options?: Omit<RequestInit, 'method' | 'body' | 'credentials'>): Promise<T> {
    return this.request<T>(path, {
      ...options,
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  put<T>(path: string, body?: unknown, options?: Omit<RequestInit, 'method' | 'body' | 'credentials'>): Promise<T> {
    return this.request<T>(path, {
      ...options,
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  patch<T>(path: string, body?: unknown, options?: Omit<RequestInit, 'method' | 'body' | 'credentials'>): Promise<T> {
    return this.request<T>(path, {
      ...options,
      method: 'PATCH',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  delete<T>(path: string, options?: Omit<RequestInit, 'method' | 'body' | 'credentials'>): Promise<T> {
    return this.request<T>(path, { ...options, method: 'DELETE' });
  }
}

export const api = new ApiClient();

export const apiEndpoints = {
  auth: {
    register: '/auth/register',
    login: '/auth/login',
    logout: '/auth/logout',
    me: '/auth/me',
  },
  users: '/users',
  user: (id: number) => `/users/${id}`,
  dashboard: {
    stats: '/dashboard/stats',
    recentActivity: (limit: number = 5) => `/dashboard/recent-activity?limit=${limit}`,
    userGrowth: '/dashboard/user-growth',
  },
};
