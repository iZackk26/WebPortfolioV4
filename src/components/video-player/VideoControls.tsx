import { ReactNode, type MouseEvent } from 'react';
import { motion } from 'framer-motion';
import { Maximize, Pause, Play, Volume2, VolumeX } from 'lucide-react';

const CONTROL_ICON_SIZE = 24;

interface ControlButtonProps {
  label: string;
  onClick: () => void;
  children: ReactNode;
}

const ControlButton = ({ label, onClick, children }: ControlButtonProps) => (
  <motion.button
    type="button"
    aria-label={label}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    onClick={onClick}
    className="text-white hover:text-[rgb(var(--color-accent))] transition-colors"
  >
    {children}
  </motion.button>
);

interface VideoControlsProps {
  isPlaying: boolean;
  isMuted: boolean;
  progress: number;
  onTogglePlay: () => void;
  onToggleMute: () => void;
  onFullscreen: () => void;
  onSeek: (event: MouseEvent<HTMLDivElement>) => void;
}

export const VideoControls = ({
  isPlaying,
  isMuted,
  progress,
  onTogglePlay,
  onToggleMute,
  onFullscreen,
  onSeek,
}: VideoControlsProps) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2 }}
    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4"
  >
    <div className="w-full h-1 bg-white/30 rounded-full mb-3 cursor-pointer group/progress" onClick={onSeek}>
      <div className="h-full bg-[rgb(var(--color-accent))] rounded-full transition-all relative" style={{ width: `${progress}%` }}>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover/progress:opacity-100 transition-opacity"></div>
      </div>
    </div>

    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <ControlButton label={isPlaying ? 'Pause' : 'Play'} onClick={onTogglePlay}>
          {isPlaying ? <Pause size={CONTROL_ICON_SIZE} /> : <Play size={CONTROL_ICON_SIZE} />}
        </ControlButton>
        <ControlButton label={isMuted ? 'Unmute' : 'Mute'} onClick={onToggleMute}>
          {isMuted ? <VolumeX size={CONTROL_ICON_SIZE} /> : <Volume2 size={CONTROL_ICON_SIZE} />}
        </ControlButton>
      </div>
      <ControlButton label="Fullscreen" onClick={onFullscreen}>
        <Maximize size={CONTROL_ICON_SIZE} />
      </ControlButton>
    </div>
  </motion.div>
);
