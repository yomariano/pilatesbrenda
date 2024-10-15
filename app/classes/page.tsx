"use client"

import { useState, useEffect, useRef } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import dynamic from 'next/dynamic';
import { supabase } from '../../lib/supabase';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

interface Level {
  id: number;
  name: string;
  videos: Video[];
}

interface Video {
  id: number;
  name: string;
  video: string;
  level: string;
  createdat: string;
  updatedat: string;
  views: number;
}

export default function ClassesPage() {
  const [levels, setLevels] = useState<Level[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [videoSize, setVideoSize] = useState({ width: '100%', height: '56.25vw' });
  const videoContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchLevelsAndVideos();
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleResize = () => {
    if (videoContainerRef.current) {
      const width = videoContainerRef.current.offsetWidth;
      const height = width * 0.5625; // 16:9 aspect ratio
      setVideoSize({ width: `${width}px`, height: `${height}px` });
    }
  };

  async function fetchLevelsAndVideos() {
    const { data: levelsData, error: levelsError } = await supabase
      .from('level')
      .select('*');

    if (levelsError) {
      console.error('Error fetching levels:', levelsError);
      return;
    }

    const { data: videosData, error: videosError } = await supabase
      .from('clase')
      .select('*');

    if (videosError) {
      console.error('Error fetching videos:', videosError);
      return;
    }

    const levelsWithVideos = levelsData.map((level: Level) => ({
      ...level,
      videos: videosData.filter((video: Video) => video.level === level.name),
    }));

    setLevels(levelsWithVideos);

    if (levelsWithVideos[0]?.videos[0]) {
      setSelectedVideo(levelsWithVideos[0].videos[0]);
    }
  }

  const handleVideoSelect = (video: Video) => {
    setSelectedVideo(video);
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white p-6 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Pilates Classes</h2>
        <Accordion type="single" collapsible className="w-full">
          {levels.map((level) => (
            <AccordionItem key={level.id} value={level.name.toLowerCase()}>
              <AccordionTrigger>{level.name}</AccordionTrigger>
              <AccordionContent>
                {level.videos.map((video) => (
                  <Button
                    key={video.id}
                    variant="ghost"
                    className="w-full justify-start mb-2"
                    onClick={() => handleVideoSelect(video)}
                  >
                    {video.name}
                  </Button>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </aside>
      <main className="flex-1 p-6 overflow-y-auto relative">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">
            {selectedVideo ? selectedVideo.name : "Select a video"}
          </h1>
        </div>
        {selectedVideo && (
          <div ref={videoContainerRef} className="w-full max-w-4xl mx-auto">
            <div style={{ position: 'relative', paddingTop: '56.25%' }}>
              <ReactPlayer
                url={selectedVideo.video}
                width={videoSize.width}
                height={videoSize.height}
                style={{ position: 'absolute', top: 0, left: 0 }}
                controls
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
