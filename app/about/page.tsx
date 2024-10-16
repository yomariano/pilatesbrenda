import { Button } from "@/components/ui/button"
import Link from "next/link"
import Header from '@/components/Header'

export default function About() {
  return (
    <>
    <Header/>
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 mt:p-8 pt-6 sm:pt-16 px-1">
      <main className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl text-center mb-8 animate-fade-in">
            About Zen Pilates
          </h1>
          <div className="mt-6 prose prose-indigo prose-lg text-gray-700 mx-auto">
            <p className="lead text-xl sm:text-2xl font-light mb-8">
              At Zen Pilates, we believe in the transformative power of mindful movement. Our mission is to help you achieve balance, strength, and inner peace through the practice of Pilates.
            </p>
            <h2 className="text-3xl font-semibold text-gray-800 mt-12 mb-6">Why Pilates?</h2>
            <p className="mb-6">
              Pilates is more than just exercise; it's a holistic approach to wellness that benefits both body and mind. Here's why Pilates is amazing for your overall health:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <li className="flex items-center space-x-2">
                <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                <span>Improves core strength and stability</span>
              </li>
              <li className="flex items-center space-x-2">
                <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                <span>Enhances flexibility and range of motion</span>
              </li>
              <li className="flex items-center space-x-2">
                <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                <span>Promotes better posture and body awareness</span>
              </li>
              <li className="flex items-center space-x-2">
                <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                <span>Reduces stress and increases mental clarity</span>
              </li>
              <li className="flex items-center space-x-2">
                <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                <span>Helps prevent injuries and aids in rehabilitation</span>
              </li>
              <li className="flex items-center space-x-2">
                <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                <span>Suitable for all ages and fitness levels</span>
              </li>
            </ul>
            <h2 className="text-3xl font-semibold text-gray-800 mt-12 mb-6">Our Commitment to You</h2>
            <p className="mb-4">
              At Zen Pilates, we're dedicated to providing a supportive and nurturing environment where you can explore the benefits of Pilates. Our expert instructors are here to guide you on your journey to better health and well-being.
            </p>
            <p className="mb-8">
              Whether you're a beginner or an experienced practitioner, we offer classes and personalized programs to meet your unique needs and goals. We believe that everyone can benefit from Pilates, and we're here to help you discover its transformative power.
            </p>
            <div className="mt-12 flex justify-center">
              <Button asChild className="px-8 py-3 text-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105">
                <Link href="/contact">Start Your Pilates Journey Today</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
    </>
  )
}
