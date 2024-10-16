import { Facebook, Instagram, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <h3 className="text-xl font-bold">Pilates Studio</h3>
          <p>&copy; 2023 All rights reserved</p>
        </div>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-secondary"><Facebook /></a>
          <a href="#" className="hover:text-secondary"><Instagram /></a>
          <a href="#" className="hover:text-secondary"><Twitter /></a>
        </div>
      </div>
    </footer>
  )
}