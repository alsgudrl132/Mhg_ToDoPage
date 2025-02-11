"use client";

import Board from "@/components/common/board";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

export default function Home() {
  interface BoardType {
    id: number;
    title: string;
  }

  const [title, setTitle] = useState<string>("");
  const [boards, setBoards] = useState<BoardType[]>([]);

  const createBoard = () => {
    // 빈 값일 경우 추가하지 않음
    if (title === "") {
      return;
    } else {
      const newBoard: BoardType = {
        id: Date.now(),
        title: title,
      };
      const curBoards = [...boards, newBoard];
      setBoards(curBoards);

      localStorage.setItem("boards", JSON.stringify(curBoards));

      console.log(curBoards);
      setTitle("");
    }
  };

  useEffect(() => {
    const storageBoards = localStorage.getItem("boards");
    if (storageBoards) {
      setBoards(JSON.parse(storageBoards));
    }
  }, []);

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
            onChange={(e) => setTitle(e.target.value)}
          />
          <Button
            type="button"
            className="bg-blue-500 hover:bg-blue-600 text-white"
            onClick={() => {
              createBoard();
            }}
          >
            보드 추가
          </Button>
        </div>
        <div className="flex gap-6 pb-6">
          {boards.map((board) => (
            <Board key={board.id} title={board.title} />
          ))}
        </div>
      </div>
    </div>
  );
}
