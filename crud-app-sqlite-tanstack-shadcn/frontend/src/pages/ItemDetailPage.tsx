import { Link } from '@tanstack/react-router';

export default function ItemDetailPage() {
    // For now, we'll use a placeholder since the router API might be different
    const item = {
        name: 'Sample Item',
        categories: ['sample-category'],
        text: 'This is a sample item description.',
        tags: ['sample', 'demo']
    };

    return (
        <div className="p-4 bg-surface rounded-card">
            <Link to="/" className="text-primary hover:underline mb-4 inline-block">&larr; Back to all items</Link>
            <h1 className="text-size-xl font-bold mb-2">{item.name}</h1>
            <p className="text-text-secondary mb-4">Category: {item.categories[0]}</p>
            <div className="prose dark:prose-invert">
                <p>{item.text}</p>
            </div>
            <div className="flex gap-2 mt-4">
                {item.tags.map((tag: string) => (
                    <span key={tag} className="tag-sm bg-surface-hover text-text-secondary rounded-button">{tag}</span>
                ))}
            </div>
        </div>
    );
}
