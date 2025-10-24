import { useState, useCallback } from 'react';

interface APIEndpoint {
  id: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  description: string;
  requestBody?: Record<string, any>;
  responseBody?: Record<string, any>;
}

export const useAPI = () => {
  const [endpoints, setEndpoints] = useState<APIEndpoint[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addEndpoint = useCallback((endpoint: Omit<APIEndpoint, 'id'>) => {
    setEndpoints(prev => [...prev, { ...endpoint, id: Date.now().toString() }]);
  }, []);

  const updateEndpoint = useCallback((id: string, updates: Partial<APIEndpoint>) => {
    setEndpoints(prev => prev.map(ep => (ep.id === id ? { ...ep, ...updates } : ep)));
  }, []);

  const removeEndpoint = useCallback((id: string) => {
    setEndpoints(prev => prev.filter(ep => ep.id !== id));
  }, []);

  const generateAPICode = useCallback((endpoint: APIEndpoint) => {
    return `
// ${endpoint.description}
export const ${endpoint.method.toLowerCase()}${endpoint.path.replace(/\//g, '_')} = async (${
      endpoint.requestBody ? 'data' : ''
    }) => {
  const response = await fetch('${endpoint.path}', {
    method: '${endpoint.method}',
    headers: {
      'Content-Type': 'application/json',
    },
    ${endpoint.requestBody ? 'body: JSON.stringify(data),' : ''}
  });
  return await response.json();
};
    `.trim();
  }, []);

  const callAPI = useCallback(async (endpoint: APIEndpoint, data?: any) => {
    setIsLoading(true);
    try {
      const response = await fetch(endpoint.path, {
        method: endpoint.method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: data ? JSON.stringify(data) : undefined,
      });
      return await response.json();
    } catch (error) {
      console.error('API call failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    endpoints,
    isLoading,
    addEndpoint,
    updateEndpoint,
    removeEndpoint,
    generateAPICode,
    callAPI,
  };
};
