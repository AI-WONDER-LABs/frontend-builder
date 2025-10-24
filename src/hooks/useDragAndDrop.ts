import { useState, useCallback } from 'react';

interface DragItem {
  id: string;
  type: string;
  data: any;
}

export const useDragAndDrop = () => {
  const [draggedItem, setDraggedItem] = useState<DragItem | null>(null);
  const [dropTarget, setDropTarget] = useState<string | null>(null);

  const handleDragStart = useCallback((item: DragItem) => {
    setDraggedItem(item);
  }, []);

  const handleDragEnd = useCallback(() => {
    setDraggedItem(null);
    setDropTarget(null);
  }, []);

  const handleDragOver = useCallback((targetId: string) => {
    setDropTarget(targetId);
  }, []);

  const handleDrop = useCallback((targetId: string, onDrop: (item: DragItem, target: string) => void) => {
    if (draggedItem) {
      onDrop(draggedItem, targetId);
    }
    setDraggedItem(null);
    setDropTarget(null);
  }, [draggedItem]);

  return {
    draggedItem,
    dropTarget,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDrop,
  };
};
