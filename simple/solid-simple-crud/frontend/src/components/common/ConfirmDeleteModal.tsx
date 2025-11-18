import { splitProps } from 'solid-js';
import Modal from './Modal';
import Button from './Button';

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  isLoading?: boolean;
}

const ConfirmDeleteModal = (props: ConfirmDeleteModalProps) => {
  const [local, _] = splitProps(props, [
    'isOpen', 'onClose', 'onConfirm', 'title', 'message', 'confirmText', 'isLoading'
  ]);

  const title = () => local.title || 'Confirm Deletion';
  const message = () => local.message || 'Are you sure you want to delete this item? This action cannot be undone.';
  const confirmText = () => local.confirmText || 'Delete';

  let cancelButtonRef: HTMLButtonElement | undefined;

  createEffect(() => {
    if (local.isOpen) {
      setTimeout(() => {
        cancelButtonRef?.focus();
      }, 100);
    }
  });

  return (
    <Modal isOpen={local.isOpen} onClose={local.onClose} title={title()} size="sm" persistent>
      <p class="text-neutral-300 text-sm mb-6" innerHTML={message()} />
      <div class="flex justify-end gap-3">
        <Button variant="secondary" onClick={local.onClose} ref={cancelButtonRef}>
          Cancel
        </Button>
        <Button variant="danger" onClick={local.onConfirm} loading={local.isLoading}>
          {confirmText()}
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmDeleteModal;