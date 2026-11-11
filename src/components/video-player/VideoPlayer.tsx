import { motion, AnimatePresence } from 'framer-motion';
import { Play } from 'lucide-react';
import { useVideoPlayer } from '../../hooks/useVideoPlayer';
import { VideoControls } from './VideoControls';

interface VideoPlayerProps {
  src: string;
  poster?: string;
}

/** Click-to-load MP4 player: nothing is downloaded until the user presses play. */
export const VideoPlayer = ({ src, poster }: VideoPlayerProps) => {
  const player = useVideoPlayer();

  return (
    <div
      className="relative bg-[rgb(var(--color-card))] border-2 border-[rgb(var(--color-border))] rounded-2xl overflow-hidden group"
      onMouseMove={player.revealControls}
      onMouseLeave={player.hideControlsWhilePlaying}
    >
      <div className="relative aspect-video bg-black">
        <video
          ref={player.videoRef}
          className="w-full h-full"
          poster={poster}
          preload="none"
          onTimeUpdate={player.updateProgress}
          onEnded={player.markEnded}
          playsInline
        >
          {player.isLoaded && <source src={src} type="video/mp4" />}
        </video>

        <AnimatePresence>
          {!player.isPlaying && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer"
              onClick={player.togglePlay}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-20 h-20 rounded-full bg-[rgb(var(--color-accent))] flex items-center justify-center shadow-2xl"
              >
                <Play size={32} className="text-white ml-1" fill="white" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {player.isBuffering && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="w-12 h-12 border-4 border-[rgb(var(--color-accent))] border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        <AnimatePresence>
          {(player.showControls || !player.isPlaying) && player.isLoaded && (
            <VideoControls
              isPlaying={player.isPlaying}
              isMuted={player.isMuted}
              progress={player.progress}
              onTogglePlay={player.togglePlay}
              onToggleMute={player.toggleMute}
              onFullscreen={player.enterFullscreen}
              onSeek={player.seek}
            />
          )}
        </AnimatePresence>
      </div>

      {!player.isLoaded && (
        <div className="p-4 border-t border-[rgb(var(--color-border))]">
          <p className="text-sm text-[rgb(var(--color-text-secondary))] text-center">
            Click play to load and watch the demonstration
          </p>
        </div>
      )}
    </div>
  );
};
