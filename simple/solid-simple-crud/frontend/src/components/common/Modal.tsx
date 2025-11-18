import { Portal } from 'solid-js/web';
import { ParentComponent, splitProps } from 'solid-js';
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
  footer?: JSX.Element;
}

const Modal: ParentComponent<ModalProps> = (props) => {
  const [local, _] = splitProps(props, [
    'isOpen', 'onClose', 'title', 'size', 'persistent', 'closeOnEsc', 
    'hideCloseButton', 'headerClass', 'bodyClass', 'footerClass', 
    'modalClass', 'children', 'footer'
  ]);

  const size = () => local.size || 'md';
  const persistent = () => local.persistent || false;
  const closeOnEsc = () => local.closeOnEsc ?? true;
  const bodyClass = () => local.bodyClass || 'py-4 px-6';

  let modalRef: HTMLDivElement | undefined;

  createEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && closeOnEsc() && local.isOpen) {
        closeModal();
      }
    };

    if (local.isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
      
      onCleanup(() => {
        document.removeEventListener('keydown', handleEsc);
        document.body.style.overflow = 'unset';
      });
    }
  });

  const closeModal = () => {
    if (persistent() && !local.hideCloseButton) {
      local.onClose();
      return;
    }
    if (!persistent()) {
      local.onClose();
    }
  };

  const handleBackdropClick = (event: MouseEvent) => {
    if (event.target === event.currentTarget && !persistent()) {
      closeModal();
    }
  };

  const baseSizeClasses = createMemo(() => {
    if (local.modalClass && (local.modalClass.includes('max-w-') || local.modalClass.includes('w-'))) {
      return '';
    }
    return {
      'sm': 'sm:max-w-sm',
      'md': 'sm:max-w-md',
      'lg': 'sm:max-w-lg',
    }[size()] || 'sm:max-w-md';
  });

  return (
    <Show when={local.isOpen}>
      <Portal>
        <div
          class="fixed inset-0 z-[100] bg-black/70 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={handleBackdropClick}
        >
          <div
            ref={modalRef}
            class={clsx(
              'bg-neutral-800 text-neutral-100 flex flex-col overflow-hidden w-full',
              baseSizeClasses(),
              local.modalClass
            )}
          >
            <Show when={local.title || !local.hideCloseButton}>
              <header class={clsx('p-4 border-b border-neutral-700 flex items-center justify-between shrink-0', local.headerClass)}>
                <Show when={local.title} fallback={<div></div>}>
                  <h2 class="text-lg font-semibold">{local.title}</h2>
                </Show>
                <Show when={!local.hideCloseButton}>
                  <Button
                    variant="stealth"
                    size="icon"
                    onClick={closeModal}
                    class="ml-auto -mr-2 -my-2"
                  >
                    <Icon name="X" size={20} />
                  </Button>
                </Show>
              </header>
            </Show>

            <div class={clsx('flex-1 overflow-y-auto scrollbar-thin', bodyClass())}>
              {local.children}
            </div>

            <Show when={local.footer}>
              <footer class={clsx('p-4 border-t border-neutral-700 shrink-0', local.footerClass)}>
                {local.footer}
              </footer>
            </Show>
          </div>
        </div>
      </Portal>
    </Show>
  );
};

export default Modal;