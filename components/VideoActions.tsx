import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Trash2 } from 'lucide-react';

interface Level {
  id: number;
  name: string;
}

interface VideoActionsProps {
  levels: Level[];
  onAddVideo: (file: File, name: string, level: string) => void;
  onRemoveVideo: () => void;
  isVideoSelected: boolean;
}

const VideoActions: React.FC<VideoActionsProps> = ({ levels, onAddVideo, onRemoveVideo, isVideoSelected }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [videoName, setVideoName] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (selectedFile && videoName && selectedLevel) {
      onAddVideo(selectedFile, videoName, selectedLevel);
      setIsModalOpen(false);
      setSelectedFile(null);
      setVideoName('');
      setSelectedLevel('');
    }
  };

  return (
    <div className="flex justify-between items-center mb-4">
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Video
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Video</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              type="file"
              onChange={handleFileChange}
              accept="video/*"
            />
            <Input
              placeholder="Video Name"
              value={videoName}
              onChange={(e) => setVideoName(e.target.value)}
            />
            <Select onValueChange={setSelectedLevel}>
              <SelectTrigger>
                <SelectValue placeholder="Select a level" />
              </SelectTrigger>
              <SelectContent>
                {levels.map((level) => (
                  <SelectItem key={level.id} value={level.name}>
                    {level.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>
                Submit
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <Button size="sm" onClick={onRemoveVideo} disabled={!isVideoSelected}>
        <Trash2 className="h-4 w-4 mr-2" />
        Remove Video
      </Button>
    </div>
  );
};

export default VideoActions;
