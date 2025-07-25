import { auth } from '../firebase/config';

class ApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';
  }

  private async getAuthToken(): Promise<string | null> {
    try {
      const user = auth.currentUser;
      if (user) {
        return await user.getIdToken();
      }
      return null;
    } catch (error) {
      console.error('Erro ao obter token:', error);
      return null;
    }
  }

  private async makeRequest(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<any> {
    const token = await this.getAuthToken();
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const config: RequestInit = {
      ...options,
      headers,
    };

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erro na requisição API:', error);
      throw error;
    }
  }

  // GET request
  async get(endpoint: string): Promise<any> {
    return this.makeRequest(endpoint, { method: 'GET' });
  }

  // POST request
  async post(endpoint: string, data?: any): Promise<any> {
    return this.makeRequest(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // PUT request
  async put(endpoint: string, data?: any): Promise<any> {
    return this.makeRequest(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // DELETE request
  async delete(endpoint: string): Promise<any> {
    return this.makeRequest(endpoint, { method: 'DELETE' });
  }

  // Upload de arquivo
  async uploadFile(endpoint: string, file: File): Promise<any> {
    const token = await this.getAuthToken();
    
    const formData = new FormData();
    formData.append('file', file);

    const headers: HeadersInit = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'POST',
        headers,
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erro no upload:', error);
      throw error;
    }
  }

  // Métodos específicos da aplicação
  async getUserData(): Promise<any> {
    return this.get('/user-data/');
  }

  async uploadNotas(file: File): Promise<any> {
    return this.uploadFile('/upload-notas/', file);
  }

  async getNotas(): Promise<any> {
    return this.get('/notas/');
  }

  async deleteNotas(): Promise<any> {
    return this.delete('/notas/');
  }
}

export const apiService = new ApiService();
export default apiService; 