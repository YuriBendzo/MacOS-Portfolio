import { storeToRefs } from 'pinia'
import { useWindowStore } from '~/stores/window'

export const useWindowSystem = () => {
  const store = useWindowStore()
  const { windows, activeWindowId } = storeToRefs(store)
  
  return {
    windows,
    activeWindowId,
    openWindow: store.openWindow,
    closeWindow: store.closeWindow,
    minimizeWindow: store.minimizeWindow,
    maximizeWindow: store.maximizeWindow,
    focusWindow: store.focusWindow,
    updateWindowPosition: store.updateWindowPosition,
    updateWindowSize: store.updateWindowSize,
  }
}
