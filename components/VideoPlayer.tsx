"use client"

import { RefObject } from 'react'

interface VideoPlayerProps {
  videoUrl: string;
}

export default function VideoPlayer({ videoUrl }: VideoPlayerProps) {
  return (
    <video 
      //ref={videoRef}
      src={videoUrl} 
      controls 
      className="w-full h-full rounded-lg"
    >
      Your browser does not support the video tag.
    </video>
  );
}
