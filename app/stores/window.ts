import { defineStore } from 'pinia';

export interface WindowState {
  id: string;
  title: string;
  component: string; // Name of the component to render
  icon: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
  props?: Record<string, any>;
};

export const useWindowStore = defineStore('window', () => {
  const windows = ref<WindowState[]>([]);
  const activeWindowId = ref<string | null>(null);
  const nextZIndex = ref(10);

  const openWindow = (
    id: string,
    title: string,
    component: string,
    icon: string,
    props = {}
  ) => {
    const existingWindow = windows.value.find((w) => w.id === id);

    if (existingWindow) {
      if (existingWindow.isMinimized) {
        existingWindow.isMinimized = false;
      }
      if (props && Object.keys(props).length > 0) {
        existingWindow.props = { ...existingWindow.props, ...props };
      }
      focusWindow(id);
      return;
    }

    // Default position (cascade effect)
    const count = windows.value.length;
    const x = 100 + count * 30;
    const y = 50 + count * 30;

    windows.value.push({
      id,
      title,
      component,
      icon,
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      zIndex: nextZIndex.value++,
      position: { x, y },
      size: { width: 600, height: 400 },
      props,
    });

    activeWindowId.value = id;
  };

  const closeWindow = (id: string) => {
    const index = windows.value.findIndex((w) => w.id === id);
    if (index !== -1) {
      windows.value.splice(index, 1);
    }
    if (activeWindowId.value === id) {
      activeWindowId.value = null;
    }
  };

  const minimizeWindow = (id: string) => {
    const win = windows.value.find((w) => w.id === id);
    if (win) {
      win.isMinimized = true;
      if (activeWindowId.value === id) {
        activeWindowId.value = null;
      }
    }
  };

  const maximizeWindow = (id: string) => {
    const win = windows.value.find((w) => w.id === id);
    if (win) {
      win.isMaximized = !win.isMaximized;
      focusWindow(id);
    }
  };

  const focusWindow = (id: string) => {
    const win = windows.value.find((w) => w.id === id);
    if (win) {
      if (win.isMinimized) {
        win.isMinimized = false;
      }
      win.zIndex = nextZIndex.value++;
      activeWindowId.value = id;
    }
  };

  const updateWindowPosition = (id: string, x: number, y: number) => {
    const win = windows.value.find((w) => w.id === id);
    if (win) {
      win.position = { x, y };
    }
  };

  const updateWindowSize = (id: string, width: number, height: number) => {
    const win = windows.value.find((w) => w.id === id);
    if (win) {
      win.size = { width, height };
    }
  };

  return {
    windows,
    activeWindowId,
    openWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
    updateWindowPosition,
    updateWindowSize,
  }
});
