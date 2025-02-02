import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-4">
      <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center">
        Welcome to <span className="text-primary">StreamSync</span>
      </h1>
      <p className="text-lg md:text-xl text-gray-400 mb-8 text-center max-w-2xl">
        Your local streaming solution for watching together. Join as a viewer or log in as admin to manage content.
      </p>
      <div className="flex gap-4">
        <Button
          variant="default"
          size="lg"
          onClick={() => navigate("/player")}
          className="bg-primary hover:bg-primary/90"
        >
          Join as Viewer
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={() => navigate("/admin")}
        >
          Admin Login
        </Button>
      </div>
    </div>
  );
};

export default Index;