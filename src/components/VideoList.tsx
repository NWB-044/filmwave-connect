import { Card, CardContent } from "@/components/ui/card";
import { Play } from "lucide-react";

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
}

interface VideoListProps {
  videos: Video[];
  onSelect: (videoId: string) => void;
}

const VideoList = ({ videos, onSelect }: VideoListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
      {videos.map((video) => (
        <Card
          key={video.id}
          className="group cursor-pointer hover:ring-2 hover:ring-primary transition-all"
          onClick={() => onSelect(video.id)}
        >
          <CardContent className="p-0 relative aspect-video">
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-full object-cover rounded-t-lg"
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Play className="w-12 h-12 text-white" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
              <h3 className="text-white font-semibold truncate">{video.title}</h3>
              <p className="text-white/80 text-sm">{video.duration}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default VideoList;