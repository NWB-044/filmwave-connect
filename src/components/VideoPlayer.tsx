import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

interface VideoPlayerProps {
  src: string;
  isAdmin?: boolean;
}

const VideoPlayer = ({ src, isAdmin = false }: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
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

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.addEventListener("timeupdate", handleProgress);
      return () => video.removeEventListener("timeupdate", handleProgress);
    }
  }, []);

  return (
    <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full"
        onClick={togglePlay}
      />
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
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;