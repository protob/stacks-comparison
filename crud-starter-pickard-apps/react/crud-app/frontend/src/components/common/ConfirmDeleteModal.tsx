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

const ConfirmDeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Deletion',
  message = 'Are you sure you want to delete this item? This action cannot be undone.',
  confirmText = 'Delete',
  isLoading = false
}: ConfirmDeleteModalProps) => {
  const cancelButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        cancelButtonRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm" persistent>
      <p className="text-neutral-300 text-sm mb-6" dangerouslySetInnerHTML={{ __html: message }} />
      <div className="flex justify-end gap-3">
        <Button variant="secondary" onClick={onClose} ref={cancelButtonRef}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm} loading={isLoading}>
          {confirmText}
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmDeleteModal;