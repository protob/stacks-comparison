import { create } from 'zustand';
import { toast } from "sonner";
import type { NotificationType } from '@/types';

interface UiState {
  isLoading: boolean;
  setIsLoading: (status: boolean, message?: string) => void;
  showNotification: (type: NotificationType, message: string) => void;
  showSuccessToast: (message: string) => void;
  showErrorToast: (message: string) => void;
  showWarningToast: (message: string) => void;
  showInfoToast: (message: string) => void;
}

export const useUiStore = create<UiState>((set) => ({
  isLoading: false,
  setIsLoading: (status: boolean) => set({ isLoading: status }),
  showNotification: (type: NotificationType, message: string) => {
    switch (type) {
      case 'success': toast.success(message); break;
      case 'error': toast.error(message); break;
      case 'warning': toast.warning(message); break;
      case 'info': toast.info(message); break;
      default: toast(message);
    }
  },
  showSuccessToast: (message: string) => toast.success(message),
  showErrorToast: (message: string) => toast.error(message),
  showWarningToast: (message: string) => toast.warning(message),
  showInfoToast: (message: string) => toast.info(message),
}));