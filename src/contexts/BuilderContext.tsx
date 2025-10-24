"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export interface Component {
  id: string;
  type: string;
  props: Record<string, any>;
  children?: Component[];
}

export interface Page {
  id: string;
  name: string;
  path: string;
  components: Component[];
}

interface BuilderState {
  pages: Page[];
  currentPageId: string | null;
  selectedComponentId: string | null;
  history: Page[][];
  historyIndex: number;
}

interface BuilderContextType {
  builderState: BuilderState;
  addPage: (page: Omit<Page, 'id'>) => void;
  removePage: (pageId: string) => void;
  setCurrentPage: (pageId: string) => void;
  addComponent: (pageId: string, component: Omit<Component, 'id'>) => void;
  updateComponent: (pageId: string, componentId: string, updates: Partial<Component>) => void;
  removeComponent: (pageId: string, componentId: string) => void;
  selectComponent: (componentId: string | null) => void;
  undo: () => void;
  redo: () => void;
  exportCode: () => string;
}

const BuilderContext = createContext<BuilderContextType | undefined>(undefined);

export const BuilderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [builderState, setBuilderState] = useState<BuilderState>({
    pages: [
      {
        id: '1',
        name: 'Home',
        path: '/',
        components: [],
      },
    ],
    currentPageId: '1',
    selectedComponentId: null,
    history: [],
    historyIndex: -1,
  });

  const addPage = useCallback((page: Omit<Page, 'id'>) => {
    setBuilderState(prev => ({
      ...prev,
      pages: [...prev.pages, { ...page, id: Date.now().toString() }],
    }));
  }, []);

  const removePage = useCallback((pageId: string) => {
    setBuilderState(prev => ({
      ...prev,
      pages: prev.pages.filter(p => p.id !== pageId),
    }));
  }, []);

  const setCurrentPage = useCallback((pageId: string) => {
    setBuilderState(prev => ({
      ...prev,
      currentPageId: pageId,
    }));
  }, []);

  const addComponent = useCallback((pageId: string, component: Omit<Component, 'id'>) => {
    setBuilderState(prev => ({
      ...prev,
      pages: prev.pages.map(page =>
        page.id === pageId
          ? {
              ...page,
              components: [...page.components, { ...component, id: Date.now().toString() }],
            }
          : page
      ),
    }));
  }, []);

  const updateComponent = useCallback((pageId: string, componentId: string, updates: Partial<Component>) => {
    setBuilderState(prev => ({
      ...prev,
      pages: prev.pages.map(page =>
        page.id === pageId
          ? {
              ...page,
              components: page.components.map(comp =>
                comp.id === componentId ? { ...comp, ...updates } : comp
              ),
            }
          : page
      ),
    }));
  }, []);

  const removeComponent = useCallback((pageId: string, componentId: string) => {
    setBuilderState(prev => ({
      ...prev,
      pages: prev.pages.map(page =>
        page.id === pageId
          ? {
              ...page,
              components: page.components.filter(comp => comp.id !== componentId),
            }
          : page
      ),
    }));
  }, []);

  const selectComponent = useCallback((componentId: string | null) => {
    setBuilderState(prev => ({
      ...prev,
      selectedComponentId: componentId,
    }));
  }, []);

  const undo = useCallback(() => {
    setBuilderState(prev => {
      if (prev.historyIndex > 0) {
        return {
          ...prev,
          pages: prev.history[prev.historyIndex - 1],
          historyIndex: prev.historyIndex - 1,
        };
      }
      return prev;
    });
  }, []);

  const redo = useCallback(() => {
    setBuilderState(prev => {
      if (prev.historyIndex < prev.history.length - 1) {
        return {
          ...prev,
          pages: prev.history[prev.historyIndex + 1],
          historyIndex: prev.historyIndex + 1,
        };
      }
      return prev;
    });
  }, []);

  const exportCode = useCallback(() => {
    return JSON.stringify(builderState.pages, null, 2);
  }, [builderState.pages]);

  return (
    <BuilderContext.Provider
      value={{
        builderState,
        addPage,
        removePage,
        setCurrentPage,
        addComponent,
        updateComponent,
        removeComponent,
        selectComponent,
        undo,
        redo,
        exportCode,
      }}
    >
      {children}
    </BuilderContext.Provider>
  );
};

export const useBuilder = () => {
  const context = useContext(BuilderContext);
  if (context === undefined) {
    throw new Error('useBuilder must be used within a BuilderProvider');
  }
  return context;
};
