"use client"

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { supabase } from '../../lib/supabase';
import ClassList from '@/components/ClassList'
import VideoPlayer from '@/components/VideoPlayer'
import VideoActions from '@/components/VideoActions'
import Header from '@/components/Header'

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

  useEffect(() => {
    console.log(selectedVideo)
  }, [selectedVideo])

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

  const handleAddVideo = async (file: File, name: string, level: string) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('videos')
      .upload(filePath, file);

    if (uploadError) {
      console.error('Error uploading video:', uploadError);
      return;
    }

    const { data: publicUrlData } = supabase.storage
      .from('videos')
      .getPublicUrl(filePath);

    const publicUrl = publicUrlData.publicUrl;

    const { error: insertError } = await supabase
      .from('clase')
      .insert({
        name: name,
        video: publicUrl,
        level: level,
        views: 0,
      });

    if (insertError) {
      console.error('Error inserting video data:', insertError);
    } else {
      fetchLevelsAndVideos();
    }
  };

  const handleRemoveVideo = async () => {
    if (!selectedVideo) return;

    const { error } = await supabase
      .from('clase')
      .delete()
      .eq('id', selectedVideo.id);

    if (error) {
      console.error('Error removing video:', error);
    } else {
      setSelectedVideo(null);
      fetchLevelsAndVideos();
    }
  };

  return (
    <div> 
      <Header />
      <div className="flex flex-col md:flex-row h-screen bg-gray-100 mt:p-8 pt-6 sm:pt-16 px-1">
      
       <aside className="w-full md:w-64 bg-white p-4 md:p-6 overflow-y-auto">
         <h2 className="text-xl md:text-2xl font-bold mb-4">Pilates Classes</h2>
         <ClassList levels={levels} onVideoSelect={handleVideoSelect} />
       </aside>
       <main className="flex-1 p-4 md:p-6 overflow-y-auto relative">
         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
           <h1 className="text-2xl md:text-3xl font-bold mb-2 md:mb-0">
             {selectedVideo ? selectedVideo.name : "Select a video"}
           </h1>
         </div>
         <VideoActions
           levels={levels}
           onAddVideo={handleAddVideo}
           onRemoveVideo={handleRemoveVideo}
           isVideoSelected={!!selectedVideo}
         />
         {selectedVideo && (
           <VideoPlayer
             videoUrl={selectedVideo.video}
           />
         )}
       </main>
     </div>
    </div>
    
  );
}
