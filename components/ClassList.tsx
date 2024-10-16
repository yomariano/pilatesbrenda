import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { useState } from "react"

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

interface ClassListProps {
  levels: Level[];
  onVideoSelect: (video: Video) => void;
}

export default function ClassList({ levels, onVideoSelect }: ClassListProps) {
  const [openLevel, setOpenLevel] = useState<string | undefined>(undefined);

  const handleVideoSelect = (video: Video) => {
    onVideoSelect(video);
    setOpenLevel(undefined);
  };

  return (
    <Accordion type="single" collapsible className="w-full">
      {levels.map((level) => (
        <AccordionItem key={level.id} value={level.name.toLowerCase()}>
          <AccordionTrigger className="text-sm md:text-base text-gray-800">
            {level.name}
          </AccordionTrigger>
          <AccordionContent>
            {level.videos.map((video) => (
              <div key={video.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 space-y-2 sm:space-y-0">
                <div className="w-full sm:w-auto">
                  <h3 className="font-semibold text-sm md:text-base text-gray-800">
                    {video.name.length > 10 ? `${video.name.slice(0, 10)}...` : video.name}
                  </h3>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full sm:w-auto mt-1 sm:mt-0 text-gray-800"
                  onClick={() => handleVideoSelect(video)}
                >
                  Watch
                </Button>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
