"use client";
import { Pencil, Plus, X } from "lucide-react";
import React, { useEffect, useState } from "react";
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
import { Board } from "@/types/board";

function BoardComponent() {
  const [board, setBoard] = useState<string>("");
  const [localBoards, setLocalBoards] = useState<Board[]>([]);
  const [editingTitle, setEditingTitle] = useState<string>("");
  const [openDialogId, setOpenDialogId] = useState<number | null>(null);

  useEffect(() => {
    const storedBoards = localStorage.getItem("boards");
    if (storedBoards) {
      try {
        const parsed = JSON.parse(storedBoards);
        setLocalBoards(parsed);
      } catch (error) {
        console.error("Error parsing stored boards:", error);
        localStorage.removeItem("boards");
      }
    }
  }, []);

  const updateLocalStorage = (boards: Board[]): void => {
    localStorage.setItem("boards", JSON.stringify(boards));
  };

  const handelKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    option: "add" | "edit",
    id?: number
  ): void => {
    if (e.key === "Enter" && option === "add") {
      addBoard();
    }
    if (id && e.key === "Enter" && option === "edit") {
      editBoard(id);
    }
  };

  const addBoard = (): void => {
    if (!board.trim()) return;

    const newBoard: Board = {
      id: Date.now(),
      title: board.trim(),
    };

    setLocalBoards((prev) => {
      const updated = [...prev, newBoard];
      updateLocalStorage(updated);
      return updated;
    });

    setBoard("");
  };

  const editBoard = (id: number): void => {
    if (!editingTitle.trim()) return;
    const idx = localBoards.findIndex((item) => item.id === id);
    setLocalBoards((prevBoards) => {
      const newBoards = [...prevBoards];
      newBoards[idx] = { ...newBoards[idx], title: editingTitle.trim() };
      updateLocalStorage(newBoards);
      return newBoards;
    });
    setEditingTitle("");
    setOpenDialogId(null);
  };

  const deleteBoard = (id: number): void => {
    setLocalBoards((prevBoards) => {
      const filterBoards = prevBoards.filter((item) => item.id !== id);
      updateLocalStorage(filterBoards);
      return filterBoards;
    });
  };

  return (
    <div>
      <div className="flex gap-3">
        <Input
          type="text"
          value={board}
          placeholder="새 보드 이름"
          className="max-w-xs bg-white border-gray-200 focus:border-gray-300 focus:ring-gray-200"
          maxLength={100}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setBoard(e.target.value)
          }
          onKeyDown={(e) => handelKeyDown(e, "add")}
        />
        <Button
          type="button"
          className="bg-blue-500 hover:bg-blue-600 text-white"
          onClick={addBoard}
        >
          보드 추가
        </Button>
      </div>
      <div className="flex gap-7 flex-wrap">
        {localBoards.map((item) => (
          <div
            key={item.id}
            className="mt-10 p-6 w-auto bg-white border border-gray-200 rounded-lg shadow-sm"
          >
            <div className="flex gap-2 p-3 rounded-lg mb-4">
              <p className="text-gray-800 font-medium text-sm break-all w-40">
                {item.title}
              </p>
              <div className="flex gap-2">
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
                          onKeyDown={(e) => handelKeyDown(e, "edit", item.id)}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        className="bg-blue-500 hover:bg-blue-600 text-white"
                        type="button"
                        onClick={() => editBoard(item.id)}
                      >
                        변경하기
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <X
                  size={16}
                  className="text-gray-400 hover:text-red-500 cursor-pointer transition-colors ml-auto"
                  onClick={() => deleteBoard(item.id)}
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

export default BoardComponent;
