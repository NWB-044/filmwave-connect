import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import AdminSidebar from "@/components/AdminSidebar";
import VideoList from "@/components/VideoList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";

// Mock data - replace with real data later
const mockVideos = [
  {
    id: "1",
    title: "Big Buck Bunny",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Big_buck_bunny_poster_big.jpg/640px-Big_buck_bunny_poster_big.jpg",
    duration: "10:34",
  },
  {
    id: "2",
    title: "Sintel",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Sintel_poster.jpg/640px-Sintel_poster.jpg",
    duration: "14:48",
  },
];

const Admin = () => {
  const [selectedSection, setSelectedSection] = useState("videos");

  const renderContent = () => {
    switch (selectedSection) {
      case "upload":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Upload Video</h2>
            <div className="max-w-md space-y-4">
              <div>
                <Label htmlFor="title">Video Title</Label>
                <Input id="title" placeholder="Enter video title" />
              </div>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="mx-auto w-12 h-12 text-gray-400 mb-4" />
                <p className="text-sm text-gray-600">
                  Drag and drop your video file here, or click to browse
                </p>
                <input type="file" className="hidden" accept="video/*" />
                <Button variant="outline" className="mt-4">
                  Select File
                </Button>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div>
            <div className="p-6 border-b">
              <h2 className="text-2xl font-bold">Video Library</h2>
            </div>
            <VideoList
              videos={mockVideos}
              onSelect={(videoId) => console.log("Selected video:", videoId)}
            />
          </div>
        );
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AdminSidebar />
        <main className="flex-1 bg-background">
          {renderContent()}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Admin;