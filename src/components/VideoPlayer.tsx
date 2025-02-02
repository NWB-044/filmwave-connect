import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Settings, Maximize } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";

interface VideoPlayerProps {
  src: string;
  subtitleSrc?: string;
  isAdmin?: boolean;
  onStateChange?: (state: VideoState) => void;
}

interface VideoState {
  isPlaying: boolean;
  currentTime: number;
  playbackRate: number;
  subtitleOffset: number;
}

const VideoPlayer = ({ src, subtitleSrc, isAdmin = false, onStateChange }: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(error => {
          toast.error("Failed to play video: " + error.message);
        });
      }
      setIsPlaying(!isPlaying);
      onStateChange?.({ 
        isPlaying: !isPlaying,
        currentTime: videoRef.current.currentTime,
        playbackRate: videoRef.current.playbackRate,
        subtitleOffset: 0
      });
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleProgress = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(progress);
      onStateChange?.({
        isPlaying,
        currentTime: videoRef.current.currentTime,
        playbackRate: videoRef.current.playbackRate,
        subtitleOffset: 0
      });
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement && containerRef.current) {
      containerRef.current.requestFullscreen().catch(err => {
        toast.error("Error attempting to enable fullscreen: " + err.message);
      });
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.addEventListener("timeupdate", handleProgress);
      return () => video.removeEventListener("timeupdate", handleProgress);
    }
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full"
        onClick={togglePlay}
      >
        {subtitleSrc && (
          <track
            kind="subtitles"
            src={subtitleSrc}
            srcLang="en"
            label="English"
            default
          />
        )}
      </video>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:text-primary"
            onClick={togglePlay}
          >
            {isPlaying ? <Pause /> : <Play />}
          </Button>
          <div className="flex items-center gap-2 min-w-[120px]">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:text-primary"
              onClick={toggleMute}
            >
              {isMuted ? <VolumeX /> : <Volume2 />}
            </Button>
            <Slider
              value={[isMuted ? 0 : volume]}
              max={1}
              step={0.1}
              onValueChange={handleVolumeChange}
              className="w-24"
            />
          </div>
          <div className="flex-1">
            <Slider
              value={[progress]}
              max={100}
              step={0.1}
              className="w-full"
              onValueChange={(value) => {
                if (videoRef.current) {
                  const time = (value[0] / 100) * videoRef.current.duration;
                  videoRef.current.currentTime = time;
                }
              }}
            />
          </div>
          {isAdmin && (
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:text-primary"
              onClick={() => {
                if (videoRef.current) {
                  const newRate = videoRef.current.playbackRate === 1 ? 1.5 : 1;
                  videoRef.current.playbackRate = newRate;
                  toast.success(`Playback speed: ${newRate}x`);
                }
              }}
            >
              <Settings className="w-4 h-4" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:text-primary"
            onClick={toggleFullscreen}
          >
            <Maximize className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;