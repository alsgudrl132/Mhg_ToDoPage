import { Plus, X } from "lucide-react";
import React, { useState } from "react";
import Todo from "./todo";
import { Button } from "../ui/button";
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

interface BoardProps {
  title: string;
  id: number;
}

function Board({ title, id }: BoardProps) {
  const [desc, setDesc] = useState<string>("");

  const createTodo = () => {
    if (desc === "") return;
    const storageData = JSON.parse(localStorage.getItem("boards") || "[]");
    const idx = storageData.findIndex((board: BoardProps) => board.id === id);
    if (!storageData[idx].desc) {
      storageData[idx].desc = [desc];
    } else {
      storageData[idx].desc.push(desc);
    }
    localStorage.setItem("boards", JSON.stringify(storageData));
    setDesc("");
  };

  return (
    <div className="mt-10 p-6 w-auto bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="flex items-center justify-between p-3 rounded-lg mb-4">
        <p className="text-gray-800 font-medium">{title}</p>
        <X
          size={16}
          className="text-gray-400 hover:text-red-500 cursor-pointer transition-colors"
        />
      </div>
      <Todo id={id} />
      <div>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="w-full bg-white hover:bg-gray-50 text-gray-600 border-gray-200"
            >
              <Plus className="mr-2 h-4 w-4" /> Todo 추가
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Todo 추가</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Todo
                </Label>
                <Input
                  id="name"
                  placeholder="새 Todo 이름"
                  className="col-span-3"
                  onChange={(e) => setDesc(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                className="bg-blue-500 hover:bg-blue-600 text-white"
                type="submit"
                onClick={createTodo}
              >
                추가하기
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default Board;
