import { Volume2, VolumeX } from 'lucide-react';
import { useAudioContext } from '../../contexts/AudioContext';
import { Button } from './button';
import { cn } from '../../lib/utils';

interface AudioPlayerProps {
  variant?: 'fixed' | 'inline';
}

export default function AudioPlayer({ variant = 'inline' }: AudioPlayerProps): JSX.Element {
  const { isMuted, toggleMute } = useAudioContext();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleMute}
      className={cn(
        'clickable rounded-full',
        variant === 'fixed' &&
          'fixed bottom-6 right-6 z-50 border border-border bg-background/50 backdrop-blur-sm'
      )}
      aria-label="Toggle mute"
    >
      {isMuted ? (
        <VolumeX className="h-5 w-5 transition-colors" />
      ) : (
        <Volume2 className="h-5 w-5 transition-colors" />
      )}
    </Button>
  );
}
