"use client";

import { useState, useEffect, useRef } from 'react';
import { supabase } from '../../lib/supabase';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import ReactPlayer from 'react-player';
import { Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import VideoActions from '@/components/VideoActions';

// Update Level interface
interface Level {
  id: number;
  name: string;
  videos: Video[]; // Add this line
}

// Update Video interface
interface Video {
  id: number;
  name: string;
  video: string; // URL of the video
  level: string;
  createdat: string;
  updatedat: string;
  views: number;
}

export default function AdminVideoUpload() {
  const [levels, setLevels] = useState<Level[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null); // Add this state
  const [videoSize, setVideoSize] = useState({ width: '100%', height: '56.25vw' });
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
  }

  async function handleLevelSelect(value: string) {
    const level = levels.find(l => l.id.toString() === value);
    setSelectedLevel(level || null);
  }

  async function handleVideoUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file || !selectedLevel) return;
    setVideo(file);
  }

  async function uploadVideo() {
    if (!video || !selectedLevel) return;
    setUploading(true);

    const fileExt = video.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    // Upload the video to the 'videos' bucket
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('videos')
      .upload(filePath, video);

    if (uploadError) {
      console.error('Error uploading video:', uploadError);
      setUploading(false);
      return;
    }

    // Get the public URL of the uploaded video
    const { data: publicUrlData } = supabase.storage
      .from('videos')
      .getPublicUrl(filePath);

    const publicUrl = publicUrlData.publicUrl;

    // Insert the video data into the 'clase' table
    const { error: insertError } = await supabase
      .from('clase')
      .insert({
        name: video.name,
        video: publicUrl, // Store the public URL
        level: selectedLevel.name,
        views: 0,
      });

    if (insertError) {
      console.error('Error inserting video data:', insertError);
    } else {
      setVideo(null);
      fetchLevelsAndVideos();
    }

    setUploading(false);
  }

  const handleUpload = () => {
    uploadVideo();
    setIsModalOpen(false);
  };

  const handleAddVideo = async (file: File, name: string, level: string) => {
    setUploading(true);

    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('videos')
      .upload(filePath, file);

    if (uploadError) {
      console.error('Error uploading video:', uploadError);
      setUploading(false);
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

    setUploading(false);
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
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      <aside className="w-full md:w-64 bg-white p-4 md:p-6 overflow-y-auto">
        <h2 className="text-xl md:text-2xl font-bold mb-4">Pilates Classes</h2>
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
                    onClick={() => setSelectedVideo(video)}
                  >
                    {video.name}
                  </Button>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
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
          <div ref={videoContainerRef} className="w-full max-w-4xl mx-auto mt-4">
            <div style={{ position: 'relative', paddingTop: '56.25%' }}>
              <ReactPlayer
                url={selectedVideo.video}
                width="100%"
                height="100%"
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
