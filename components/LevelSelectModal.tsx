"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface LevelSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLevel: (level: string) => void;
}

export function LevelSelectModal({ isOpen, onClose, onSelectLevel }: LevelSelectModalProps) {
  const levels = ['Beginner', 'Intermediate', 'Advanced'];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Select Level</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {levels.map((level) => (
            <Button
              key={level}
              onClick={() => {
                onSelectLevel(level);
                onClose();
              }}
              variant="outline"
              className="w-full"
            >
              {level}
            </Button>
          ))}
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
