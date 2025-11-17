import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import Button from './Button';
import Icon from './Icon';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg';
  persistent?: boolean;
  closeOnEsc?: boolean;
  hideCloseButton?: boolean;
  headerClass?: string;
  bodyClass?: string;
  footerClass?: string;
  modalClass?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

const Modal = ({
  isOpen,
  onClose,
  title,
  size = 'md',
  persistent = false,
  closeOnEsc = true,
  hideCloseButton = false,
  headerClass = '',
  bodyClass = 'py-4 px-6',
  footerClass = '',
  modalClass = '',
  children,
  footer
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && closeOnEsc && isOpen) {
        closeModal();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, closeOnEsc]);

  const closeModal = useCallback(() => {
    if (persistent && !hideCloseButton) {
      onClose();
      return;
    }
    if (!persistent) {
      onClose();
    }
  }, [persistent, hideCloseButton, onClose]);

  const handleBackdropClick = useCallback((event: React.MouseEvent) => {
    if (event.target === event.currentTarget && !persistent) {
      closeModal();
    }
  }, [persistent, closeModal]);

  const baseSizeClasses = useMemo(() => {
    if (modalClass && (modalClass.includes('max-w-') || modalClass.includes('w-'))) {
      return '';
    }
    return {
      'sm': 'sm:max-w-sm',
      'md': 'sm:max-w-md',
      'lg': 'sm:max-w-lg',
    }[size] || 'sm:max-w-md';
  }, [modalClass, size]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] bg-black/70 flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className={clsx(
          'bg-neutral-800 text-neutral-100 flex flex-col overflow-hidden w-full',
          baseSizeClasses,
          modalClass
        )}
      >
        {(title || !hideCloseButton) && (
          <header className={clsx('p-4 border-b border-neutral-700 flex items-center justify-between shrink-0', headerClass)}>
            {title ? (
              <h2 className="text-lg font-semibold">{title}</h2>
            ) : (
              <div></div>
            )}
            {!hideCloseButton && (
              <Button
                variant="stealth"
                size="icon"
                onClick={closeModal}
                className="ml-auto -mr-2 -my-2"
              >
                <Icon name="X" size={20} />
              </Button>
            )}
          </header>
        )}

        <div className={clsx('flex-1 overflow-y-auto scrollbar-thin', bodyClass)}>
          {children}
        </div>

        {footer && (
          <footer className={clsx('p-4 border-t border-neutral-700 shrink-0', footerClass)}>
            {footer}
          </footer>
        )}
      </div>
    </div>,
    document.body
  );
};

export default Modal;