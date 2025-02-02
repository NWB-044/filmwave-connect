import VideoPlayer from "@/components/VideoPlayer";

const Player = () => {
  // Example video URL - replace with your actual video source
  const videoUrl = "https://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_320x180.mp4";

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        <VideoPlayer src={videoUrl} />
      </div>
    </div>
  );
};

export default Player;