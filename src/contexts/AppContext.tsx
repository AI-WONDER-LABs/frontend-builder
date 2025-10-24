"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface AppState {
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  currentPage: string;
}

interface AppContextType {
  appState: AppState;
  setTheme: (theme: 'light' | 'dark') => void;
  toggleSidebar: () => void;
  setCurrentPage: (page: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [appState, setAppState] = useState<AppState>({
    theme: 'light',
    sidebarOpen: true,
    currentPage: 'home',
  });

  const setTheme = useCallback((theme: 'light' | 'dark') => {
    setAppState(prev => ({ ...prev, theme }));
  }, []);

  const toggleSidebar = useCallback(() => {
    setAppState(prev => ({ ...prev, sidebarOpen: !prev.sidebarOpen }));
  }, []);

  const setCurrentPage = useCallback((page: string) => {
    setAppState(prev => ({ ...prev, currentPage: page }));
  }, []);

  return (
    <AppContext.Provider value={{ appState, setTheme, toggleSidebar, setCurrentPage }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
