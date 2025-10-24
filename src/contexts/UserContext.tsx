"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  projects: any[];
}

interface UserContextType {
  userState: UserState;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userState, setUserState] = useState<UserState>({
    user: null,
    isAuthenticated: false,
    projects: [],
  });

  const login = useCallback((user: User) => {
    setUserState({
      user,
      isAuthenticated: true,
      projects: [],
    });
  }, []);

  const logout = useCallback(() => {
    setUserState({
      user: null,
      isAuthenticated: false,
      projects: [],
    });
  }, []);

  const updateUser = useCallback((updates: Partial<User>) => {
    setUserState(prev => ({
      ...prev,
      user: prev.user ? { ...prev.user, ...updates } : null,
    }));
  }, []);

  return (
    <UserContext.Provider value={{ userState, login, logout, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
