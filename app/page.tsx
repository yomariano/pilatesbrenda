"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { LevelSelectModal } from '@/components/LevelSelectModal';

export default function Home() {
  const [selectedLevel, setSelectedLevel] = useState('Beginner');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <main className="container mx-auto px-4">
      <h1 className="text-2xl font-bold my-4">Zen Pilates</h1>
      
      {/* Desktop view */}
      <div className="hidden md:block">
        {/* Your desktop layout here */}
      </div>

      {/* Mobile view */}
      <div className={`md:hidden ${isMobile ? 'bg-gray-100' : ''} p-4`}>
        <Button onClick={openModal} className="w-full mb-4">
          Select Level: {selectedLevel}
        </Button>
        
        {/* Video section */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Video Title</h2>
          <div className="flex space-x-2 mb-4">
            <Button variant="outline">+ Add Video</Button>
            <Button variant="outline">🗑 Remove Video</Button>
          </div>
          {/* Video player component here */}
        </div>
      </div>

      <LevelSelectModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSelectLevel={setSelectedLevel}
      />
    </main>
  );
}
