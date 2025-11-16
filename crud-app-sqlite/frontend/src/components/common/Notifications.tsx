import clsx from 'clsx'
import { useUiStore } from '../../stores/useUiStore'

export default function Notifications() {
  const { notifications, removeNotification } = useUiStore()

  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-spacing-2">
      {notifications.map(n => (
        <div key={n.id} className={clsx('p-spacing-3 rounded-radius-md shadow-md', {
          'bg-success text-inverse': n.type === 'success',
          'bg-danger text-inverse': n.type === 'error',
          'bg-primary text-inverse': n.type === 'info',
          'bg-warning text-inverse': n.type === 'warning',
        })}>
          {n.message}
          <button onClick={() => removeNotification(n.id)} className="ml-spacing-2 text-inverse">×</button>
        </div>
      ))}
    </div>
  )
}
