import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getItem } from '@/api/itemApi';
import type { Item } from '@/types';
import Button from '@/components/common/Button';
import Icon from '@/components/common/Icon';

const ItemDetailPage = () => {
  const { categorySlug, itemSlug } = useParams<{ categorySlug: string; itemSlug: string }>();
  const navigate = useNavigate();
  const [item, setItem] = useState<Item | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!categorySlug || !itemSlug) {
      setError('Invalid item URL');
      setIsLoading(false);
      return;
    }

    const fetchItem = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getItem(categorySlug, itemSlug);
        setItem(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load item');
      } finally {
        setIsLoading(false);
      }
    };

    fetchItem();
  }, [categorySlug, itemSlug]);

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-text-secondary">Loading item...</p>
        </div>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <Icon name="AlertCircle" className="w-12 h-12 mx-auto mb-3 text-danger" />
          <h2 className="text-xl font-semibold mb-2 text-text-primary">Item Not Found</h2>
          <p className="text-sm text-text-secondary mb-4">{error || 'The requested item could not be found.'}</p>
          <Link to="/">
            <Button variant="primary">Back to Items</Button>
          </Link>
        </div>
      </div>
    );
  }

  const priorityColors = {
    low: 'text-success',
    mid: 'text-warning',
    high: 'text-danger',
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="container max-w-3xl px-4 py-4 mx-auto">
        {/* Header */}
        <div className="mb-4">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1 text-text-secondary hover:text-text-primary transition-colors mb-3 text-sm"
          >
            <Icon name="ChevronLeft" className="w-3 h-3" />
            <span>Back</span>
          </button>

          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-text-primary mb-2">{item.name}</h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-text-secondary">
                <span className="flex items-center gap-1">
                  <Icon name="Folder" className="w-3 h-3" />
                  {item.categories[0]}
                </span>
                <span className={`flex items-center gap-1 font-medium ${priorityColors[item.priority]}`}>
                  <Icon name="Flag" className="w-3 h-3" />
                  {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)}
                </span>
              </div>
            </div>

            {item.isCompleted && (
              <div className="shrink-0 px-2 py-1 bg-success/20 text-success rounded-full text-xs font-medium flex items-center gap-1">
                <Icon name="CheckCircle2" className="w-3 h-3" />
                Completed
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="space-y-3">
          {/* Description */}
          {item.text && (
            <section className="p-card bg-surface rounded-card border border-border">
              <h2 className="text-sm font-semibold mb-2 text-text-primary flex items-center gap-1">
                <Icon name="FileText" className="w-3 h-3" />
                Description
              </h2>
              <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-wrap">{item.text}</p>
            </section>
          )}

          {/* Tags */}
          {item.tags && item.tags.length > 0 && (
            <section className="p-card bg-surface rounded-card border border-border">
              <h2 className="text-sm font-semibold mb-2 text-text-primary flex items-center gap-1">
                <Icon name="Tag" className="w-3 h-3" />
                Tags
              </h2>
              <div className="flex flex-wrap gap-1">
                {item.tags.map((tag, index) => (
                  <span
                    key={`${tag}-${index}`}
                    className="tag-sm bg-primary-light text-primary rounded-button"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Metadata */}
          <section className="p-card bg-surface rounded-card border border-border">
            <h2 className="text-sm font-semibold mb-2 text-text-primary flex items-center gap-1">
              <Icon name="Info" className="w-3 h-3" />
              Details
            </h2>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between py-1 border-b border-border">
                <dt className="text-text-secondary">Item ID</dt>
                <dd className="font-mono text-xs text-text-primary truncate ml-2">{item.id}</dd>
              </div>
              <div className="flex justify-between py-1 border-b border-border">
                <dt className="text-text-secondary">Slug</dt>
                <dd className="font-mono text-xs text-text-primary">{item.slug}</dd>
              </div>
              <div className="flex justify-between py-1 border-b border-border">
                <dt className="text-text-secondary">Created</dt>
                <dd className="text-text-primary">{new Date(item.createdAt).toLocaleString()}</dd>
              </div>
              <div className="flex justify-between py-1">
                <dt className="text-text-secondary">Last Updated</dt>
                <dd className="text-text-primary">{new Date(item.updatedAt).toLocaleString()}</dd>
              </div>
            </dl>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailPage;
