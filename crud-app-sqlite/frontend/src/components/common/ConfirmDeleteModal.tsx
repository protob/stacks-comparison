interface Props {
  onConfirm: () => void
  onCancel: () => void
  message: string
}

export default function ConfirmDeleteModal({ onConfirm, onCancel, message }: Props) {
  return (
    <div className="fixed inset-0 bg-background/80 flex items-center justify-center">
      <div className="bg-surface p-card-padding rounded-card-radius shadow-lg max-w-sm w-full">
        <p className="text-primary mb-spacing-4">{message}</p>
        <div className="flex justify-end gap-spacing-2">
          <button onClick={onCancel} className="bg-surface-hover text-secondary px-4 py-2 rounded-button-radius">Cancel</button>
          <button onClick={onConfirm} className="bg-danger text-inverse px-4 py-2 rounded-button-radius">Delete</button>
        </div>
      </div>
    </div>
  )
}
