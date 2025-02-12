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
        <div className="flex items-center space-x-3 mb-8">
          <Input
            type="text"
            placeholder="새 보드 이름"
            className="max-w-xs bg-white border-gray-200 focus:border-gray-300 focus:ring-gray-200"
            maxLength={100}
          />
          <Button
            type="button"
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            보드 추가
          </Button>
        </div>
        <div className="flex gap-6 pb-6 flex-wrap">
          <Board />
        </div>
      </div>
    </div>
  );
}
