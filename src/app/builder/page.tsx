"use client";

import { useBuilder } from '@/contexts/BuilderContext';
import { useDragAndDrop } from '@/hooks/useDragAndDrop';

const componentTypes = [
  { type: 'button', label: 'Button', icon: '🔘' },
  { type: 'text', label: 'Text', icon: '📝' },
  { type: 'image', label: 'Image', icon: '🖼️' },
  { type: 'container', label: 'Container', icon: '📦' },
  { type: 'input', label: 'Input', icon: '⌨️' },
  { type: 'heading', label: 'Heading', icon: '📰' },
];

export default function BuilderPage() {
  const { builderState, addComponent, selectComponent, exportCode } = useBuilder();
  const { handleDragStart, handleDragEnd, handleDrop } = useDragAndDrop();

  const currentPage = builderState.pages.find(p => p.id === builderState.currentPageId);

  const handleComponentDrop = (item: any, targetId: string) => {
    if (currentPage) {
      addComponent(currentPage.id, {
        type: item.type,
        props: {},
      });
    }
  };

  const handleExport = () => {
    const code = exportCode();
    console.log('Exported code:', code);
    alert('Code exported! Check the console.');
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Component Palette */}
      <div className="w-64 bg-white border-r border-gray-200 p-4">
        <h2 className="text-xl font-bold mb-4 text-gray-900">Components</h2>
        <div className="space-y-2">
          {componentTypes.map(comp => (
            <div
              key={comp.type}
              draggable
              onDragStart={() => handleDragStart({ id: comp.type, type: comp.type, data: comp })}
              onDragEnd={handleDragEnd}
              className="p-3 bg-blue-50 rounded-lg cursor-move hover:bg-blue-100 transition-colors border border-blue-200"
            >
              <span className="mr-2">{comp.icon}</span>
              <span className="text-gray-900 font-medium">{comp.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1 p-8">
        <div className="mb-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            {currentPage?.name || 'Builder'}
          </h1>
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Export Code
          </button>
        </div>

        <div
          className="bg-white rounded-lg shadow-lg p-8 min-h-[600px]"
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => handleDrop('canvas', handleComponentDrop)}
        >
          {currentPage?.components.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-400">
              Drag components here to start building
            </div>
          ) : (
            <div className="space-y-4">
              {currentPage?.components.map(comp => (
                <div
                  key={comp.id}
                  onClick={() => selectComponent(comp.id)}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    builderState.selectedComponentId === comp.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium text-gray-900">{comp.type}</div>
                  <div className="text-sm text-gray-500">ID: {comp.id}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Properties Panel */}
      <div className="w-64 bg-white border-l border-gray-200 p-4">
        <h2 className="text-xl font-bold mb-4 text-gray-900">Properties</h2>
        {builderState.selectedComponentId ? (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Component ID
              </label>
              <input
                type="text"
                value={builderState.selectedComponentId}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <input
                type="text"
                value={
                  currentPage?.components.find(c => c.id === builderState.selectedComponentId)
                    ?.type || ''
                }
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900"
              />
            </div>
          </div>
        ) : (
          <p className="text-gray-500 text-sm">Select a component to edit properties</p>
        )}
      </div>
    </div>
  );
}
