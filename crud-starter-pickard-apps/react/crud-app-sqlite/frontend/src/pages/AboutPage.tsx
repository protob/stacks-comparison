import { Link } from 'react-router-dom';
import Button from '@/components/common/Button';

const AboutPage = () => {
  return (
    <div className="h-full overflow-y-auto">
      <div className="container max-w-3xl px-4 py-8 mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-text-primary">About This App</h1>

        <div className="space-y-6 text-text-primary">
          <section>
            <h2 className="text-2xl font-semibold mb-3">Modern Todo Application</h2>
            <p className="text-text-secondary leading-relaxed">
              This is a full-stack todo application built with modern web technologies.
              It demonstrates best practices for building scalable, maintainable applications
              with React, TypeScript, and Go.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Tech Stack</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-surface rounded-lg border border-border">
                <h3 className="font-semibold mb-2 text-primary">Frontend</h3>
                <ul className="space-y-1 text-text-secondary text-sm">
                  <li>• React 18</li>
                  <li>• TypeScript</li>
                  <li>• Tailwind CSS v4</li>
                  <li>• Zustand (State Management)</li>
                  <li>• React Router</li>
                  <li>• Vite</li>
                </ul>
              </div>
              <div className="p-4 bg-surface rounded-lg border border-border">
                <h3 className="font-semibold mb-2 text-primary">Backend</h3>
                <ul className="space-y-1 text-text-secondary text-sm">
                  <li>• Go 1.23+</li>
                  <li>• SQLite with WAL mode</li>
                  <li>• sqlc (Type-safe queries)</li>
                  <li>• Huma v2 (OpenAPI)</li>
                  <li>• Chi Router</li>
                  <li>• Air (Hot reload)</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Features</h2>
            <ul className="space-y-2 text-text-secondary">
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span>Create, read, update, and delete items</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span>Organize items by categories</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span>Tag items for easy filtering</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span>Priority levels (Low, Medium, High)</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span>Dark/Light theme support</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span>RESTful API with OpenAPI documentation</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span>Design system with token-based styling</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Architecture Highlights</h2>
            <p className="text-text-secondary leading-relaxed mb-3">
              This application follows modern architectural patterns and best practices:
            </p>
            <ul className="space-y-2 text-text-secondary">
              <li>• Component-based UI architecture with reusable design system</li>
              <li>• Type-safe database queries with compile-time validation</li>
              <li>• Automatic API documentation generation</li>
              <li>• Centralized state management with Zustand</li>
              <li>• RESTful API with proper HTTP semantics (partial PATCH updates)</li>
              <li>• SQLite with UUIDs and optimized indexing</li>
            </ul>
          </section>

          <div className="pt-6 border-t border-border">
            <Link to="/">
              <Button variant="primary">
                Back to Items
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
