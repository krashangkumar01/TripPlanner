import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link 
            href="/" 
            className="text-2xl font-bold tracking-tight hover:text-blue-100 transition-colors"
          >
            Trip Planner
          </Link>

          {/* Navigation */}
          <nav className="flex items-center space-x-6">
            <Link 
              href="/dashboard" 
              className="font-medium hover:text-blue-100 transition-colors py-2 px-3 rounded-md hover:bg-blue-700"
            >
              Dashboard
            </Link>
            <Link 
              href="/submit" 
              className="font-medium hover:text-blue-100 transition-colors py-2 px-3 rounded-md hover:bg-blue-700"
            >
              Create New Trip
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}