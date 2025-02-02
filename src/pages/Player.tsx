import { useState, useEffect } from "react";
import VideoPlayer from "@/components/VideoPlayer";
import { toast } from "sonner";

interface VideoState {
  isPlaying: boolean;
  currentTime: number;
  playbackRate: number;
  subtitleOffset: number;
}

const Player = () => {
  const [videoState, setVideoState] = useState<VideoState>({
    isPlaying: false,
    currentTime: 0,
    playbackRate: 1,
    subtitleOffset: 0
  });

  // Example video URL - replace with your actual video source
  const videoUrl = "https://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_320x180.mp4";
  const subtitleUrl = ""; // Add your subtitle URL here

  useEffect(() => {
    // Here you would connect to your WebSocket server to receive admin state updates
    const connectToServer = () => {
      toast.success("Connected to streaming server");
    };

    connectToServer();
  }, []);

  const handleStateChange = (newState: VideoState) => {
    setVideoState(newState);
    // Here you would send the state to your WebSocket server if isAdmin
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        <VideoPlayer 
          src={videoUrl}
          subtitleSrc={subtitleUrl}
          onStateChange={handleStateChange}
        />
      </div>
    </div>
  );
};

export default Player;