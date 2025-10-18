import { Volume2, VolumeX } from 'lucide-react';
import { useAudioContext } from '@subbiah/component/contexts/AudioContext';
import { Button } from '@subbiah/component/components/ui/button';
import { cn } from '@subbiah/component/lib/utils';

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
