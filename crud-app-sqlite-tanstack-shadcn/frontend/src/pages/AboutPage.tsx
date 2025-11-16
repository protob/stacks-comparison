export default function AboutPage() {
  return (
    <div className="p-4 bg-surface rounded-card">
      <h1 className="text-size-xl font-bold mb-4">About This Application</h1>
      <p>
        This is a modern, responsive React frontend for managing items, now refactored to use the full TanStack suite:
      </p>
      <ul className="list-disc list-inside my-4 space-y-2">
        <li><strong>TanStack Query</strong> for server state management.</li>
        <li><strong>TanStack Router</strong> for type-safe client-side routing.</li>
        <li><strong>TanStack Form</strong> for performant and type-safe forms.</li>
        <li><strong>Zustand</strong> for global UI state.</li>
        <li><strong>Tailwind CSS v4</strong> for styling.</li>
      </ul>
    </div>
  );
}
