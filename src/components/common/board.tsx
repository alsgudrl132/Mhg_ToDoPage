"use client";
import { Pencil, X } from "lucide-react";
import React, { useState } from "react";
import Todo from "./todo";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useBoardStore } from "@/store/useBoardStore";

function Board() {
  const [board, setBoard] = useState<string>("");
  const [editingTitle, setEditingTitle] = useState<string>("");
  const [openDialogId, setOpenDialogId] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const {
    boards,
    addBoard,
    editBoard,
    deleteBoard,
    dragBoardStart,
    dragBoardEnd,
  } = useBoardStore();

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    option: "add" | "edit",
    id?: number
  ): void => {
    if (e.nativeEvent.isComposing) return;

    if (e.key === "Enter" && option === "add") {
      handleAddBoard();
    }
    if (id && e.key === "Enter" && option === "edit") {
      handleEditBoard(id);
    }
  };

  const handleAddBoard = (): void => {
    const trimmedBoard = board.trim();
    if (!trimmedBoard) {
      alert("보드 이름을 입력해주세요.");
      return;
    }

    setBoard("");
    requestAnimationFrame(() => {
      addBoard(trimmedBoard);
      alert("새로운 보드가 추가되었습니다.");
    });
  };

  const handleEditBoard = (id: number): void => {
    if (!editingTitle.trim()) {
      alert("보드 이름을 입력해주세요.");
      return;
    }
    editBoard(id, editingTitle.trim());
    setEditingTitle("");
    setOpenDialogId(null);
    alert("보드 이름이 수정되었습니다.");
  };

  const handleDeleteBoard = (id: number) => {
    if (window.confirm("정말로 이 보드를 삭제하시겠습니까?")) {
      deleteBoard(id);
      alert("보드가 삭제되었습니다.");
    }
  };

  const handleDragStart = (idx: number) => {
    setIsDragging(true);
    dragBoardStart(idx);
  };

  const handleDragEnd = (idx: number) => {
    setIsDragging(false);
    dragBoardEnd(idx);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <Input
          type="text"
          value={board}
          placeholder="새 보드 이름"
          className="w-full sm:w-60 bg-white border-gray-200 focus:border-gray-300 focus:ring-gray-200"
          maxLength={100}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setBoard(e.target.value)
          }
          onKeyDown={(e) => handleKeyDown(e, "add")}
        />
        <Button
          type="button"
          className="bg-blue-500 hover:bg-blue-600 text-white w-full sm:w-auto"
          onClick={handleAddBoard}
        >
          보드 추가
        </Button>
      </div>

      <div className="flex flex-wrap items-start gap-4 sm:gap-6">
        {boards.map((item, idx) => (
          <div
            key={item.id}
            className={`p-4 sm:p-6 bg-white border border-gray-200 rounded-lg shadow-sm cursor-move w-full sm:w-[280px] ${
              isDragging
                ? "opacity-50 border-2 border-dashed border-gray-300"
                : ""
            }`}
            draggable={true}
            onDragStart={() => handleDragStart(idx)}
            onDragEnd={() => handleDragEnd(idx)}
            onDragOver={handleDragOver}
            onDrop={() => handleDragEnd(idx)}
          >
            <div className="flex justify-between items-center p-2 sm:p-3 rounded-lg mb-4">
              <p className="text-gray-800 font-medium text-sm break-all flex-1">
                {item.title}
              </p>
              <div className="flex gap-2 ml-2">
                <Dialog
                  open={openDialogId === item.id}
                  onOpenChange={(open: boolean) => {
                    setOpenDialogId(open ? item.id : null);
                    if (open) {
                      setEditingTitle(item.title);
                    }
                  }}
                >
                  <DialogTrigger asChild>
                    <Pencil
                      size={16}
                      className="text-gray-400 hover:text-blue-500 cursor-pointer transition-colors"
                    />
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>타이틀 변경</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          타이틀
                        </Label>
                        <Input
                          id="name"
                          placeholder="새 타이틀 이름"
                          className="col-span-3"
                          value={editingTitle}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setEditingTitle(e.target.value)
                          }
                          onKeyDown={(e) => handleKeyDown(e, "edit", item.id)}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        className="bg-blue-500 hover:bg-blue-600 text-white"
                        type="button"
                        onClick={() => handleEditBoard(item.id)}
                      >
                        변경하기
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <X
                  size={16}
                  className="text-gray-400 hover:text-red-500 cursor-pointer transition-colors"
                  onClick={() => handleDeleteBoard(item.id)}
                />
              </div>
            </div>
            <div className="border-b-2 mb-5"></div>
            <Todo boardId={item.id} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Board;
