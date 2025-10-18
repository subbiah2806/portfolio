import { Volume2, VolumeX } from 'lucide-react';
import { useAudioContext, Button, cn } from '@subbiah/component';

export default function AudioPlayer(): JSX.Element {
  const { isMuted, toggleMute } = useAudioContext();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleMute}
      className={cn('clickable rounded-full')}
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
