"use client"

import { useState, useEffect } from 'react'
import { AspectRatio } from "@/components/ui/aspect-ratio"

export default function VideoPlayer({ videoUrl }: { videoUrl: string }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(!!videoUrl);
  }, [videoUrl]);

  return (
    <div>
      {videoUrl ? (
        <AspectRatio ratio={16 / 9}>
          <iframe
            src={videoUrl}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full rounded-lg"
          />
        </AspectRatio>
      ) : (
        <p className="mt-4 text-center text-gray-500">Select a class from the list to start watching</p>
      )}
    </div>
  );
}
