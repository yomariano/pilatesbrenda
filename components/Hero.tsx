import { Button } from "@/components/ui/button"
import Link from 'next/link'

export default function Hero() {
  return (
    <div className="relative bg-[url('https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center h-screen flex items-center justify-center text-white">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="z-10 text-center">
        <h1 className="text-5xl font-bold mb-4">Transform Your Body and Mind</h1>
        <p className="text-xl mb-8">Experience the power of Pilates with our expert instructors</p>
        <Button asChild size="lg">
          <Link href="/classes">Get Started</Link>
        </Button>
      </div>
    </div>
  )
}