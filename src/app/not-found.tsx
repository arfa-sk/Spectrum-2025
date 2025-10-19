import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-[#FFD700] mb-4">404</h1>
        <h2 className="text-2xl text-white mb-6">Page Not Found</h2>
        <p className="text-gray-400 mb-8">The page you&apos;re looking for doesn&apos;t exist.</p>
        <Link 
          href="/"
          className="inline-block bg-[#FFD700] text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
