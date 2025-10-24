/**
 * API and service type definitions
 */

export interface APIEndpoint {
  id: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  description: string;
  requestBody?: Record<string, any>;
  responseBody?: Record<string, any>;
  headers?: Record<string, string>;
}

export interface APIResponse<T = any> {
  data?: T;
  error?: string;
  status: number;
  message?: string;
}

export interface AIModel {
  id: string;
  name: string;
  provider: 'openai' | 'anthropic' | 'google' | 'custom';
  apiKey?: string;
}

export interface AIRequest {
  prompt: string;
  model: string;
  temperature?: number;
  maxTokens?: number;
}

export interface AIResponse {
  id: string;
  content: string;
  model: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}
