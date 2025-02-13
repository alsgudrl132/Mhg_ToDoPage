import Board from "@/components/common/board";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">칸반 보드</h1>
        </div>
        <div className="flex items-center space-x-3 mb-8"></div>
        <div className="flex gap-6 pb-6 flex-wrap">
          <Board />
        </div>
      </div>
    </div>
  );
}
