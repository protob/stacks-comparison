import { Link } from '@tanstack/react-router';

export default function TopBar() {
  return (
    <header className="flex justify-end items-center pb-4 mb-4 border-b border-border">
            <nav className="flex items-center gap-4">
                 <Link to="/" className="text-text-secondary hover:text-text-primary" activeProps={{ className: 'text-primary font-bold' }}>
                    Home
                </Link>
                <Link to="/about" className="text-text-secondary hover:text-text-primary" activeProps={{ className: 'text-primary font-bold' }}>
                    About
                </Link>
            </nav>
        </header>
      );
}