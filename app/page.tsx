import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <main className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">
          Welcome to Our Pilates Studio
        </h1>
        <p className="text-xl text-white mb-8">
          Transform your body and mind with our expert-led Pilates classes
        </p>
        <Link href="/classes">
          <Button
            size="lg"
            className="bg-white text-purple-600 hover:bg-purple-100"
          >
            Get Started
          </Button>
        </Link>
      </main>
    </div>
  );
}
