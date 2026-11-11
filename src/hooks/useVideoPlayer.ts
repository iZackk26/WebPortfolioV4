import { useEffect, useRef, useState, type MouseEvent } from 'react';

const CONTROLS_HIDE_DELAY_MS = 3000;
const PERCENT = 100;

/**
 * State and handlers for a lazily loaded video: the source is only attached
 * on the first play, controls auto-hide while playing, and playback failures
 * (e.g. autoplay policies) reset the player to the paused state.
 */
export const useVideoPlayer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsTimeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => () => clearTimeout(controlsTimeoutRef.current), []);

  const startPlayback = (video: HTMLVideoElement) => {
    video.play().catch((error: unknown) => {
      console.error('Video playback failed', error);
      setIsPlaying(false);
    });
    setIsPlaying(true);
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (!isLoaded) {
      setIsLoaded(true);
      setIsBuffering(true);
      video.load();
      video.onloadeddata = () => {
        setIsBuffering(false);
        startPlayback(video);
      };
      return;
    }

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      startPlayback(video);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const enterFullscreen = () => {
    videoRef.current?.requestFullscreen?.().catch((error: unknown) => {
      console.error('Fullscreen request failed', error);
    });
  };

  const updateProgress = () => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    setProgress((video.currentTime / video.duration) * PERCENT);
  };

  const seek = (event: MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    const rect = event.currentTarget.getBoundingClientRect();
    video.currentTime = ((event.clientX - rect.left) / rect.width) * video.duration;
  };

  const revealControls = () => {
    setShowControls(true);
    clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, CONTROLS_HIDE_DELAY_MS);
  };

  const hideControlsWhilePlaying = () => {
    if (isPlaying) setShowControls(false);
  };

  return {
    videoRef,
    isPlaying,
    isMuted,
    isLoaded,
    isBuffering,
    showControls,
    progress,
    togglePlay,
    toggleMute,
    enterFullscreen,
    updateProgress,
    seek,
    revealControls,
    hideControlsWhilePlaying,
    markEnded: () => setIsPlaying(false),
  };
};
