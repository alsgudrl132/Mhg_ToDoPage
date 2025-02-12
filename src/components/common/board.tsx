import { Pencil, Plus, X } from "lucide-react";
import React, { useEffect, useState } from "react";
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
  id: number;
  title: string;
}

interface BoardType {
  id: number;
  title: string;
  description: {
    id: number;
    text: string;
  };
}

function Board({ title, id }: BoardProps) {
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
  const [isOpenBoardDialog, setIsOpenBoardDialog] = useState<boolean>(false);
  const [description, setDescription] = useState<BoardType["description"]>({
    id: 0,
    text: "",
  });
  const [editingTitle, setEditingTitle] = useState<string>("");
  const [newTitle, setNewTitle] = useState<string>("");

  const getStorageData = () => {
    return JSON.parse(localStorage.getItem("boards") || "[]");
  };

  const getIdx = (storageData: BoardType[]) => {
    return storageData.findIndex((board: BoardType) => board.id === id);
  };

  const createTodo = (e: object) => {
    if (description.text === "") return;
    if (e && "key" in e && e.key !== "Enter") return;
    const storageData = getStorageData();
    const idx = getIdx(storageData);

    const newDescription = {
      id: Date.now(),
      text: description.text,
    };

    if (!storageData[idx].description) {
      storageData[idx].description = [newDescription];
    } else {
      storageData[idx].description.push(newDescription);
    }
    localStorage.setItem("boards", JSON.stringify(storageData));
    setDescription({ id: 0, text: "" });
    setIsOpenDialog(false);
  };

  const editTitle = () => {
    setIsOpenBoardDialog(true);
    const storageData = getStorageData();
    const idx = getIdx(storageData);
    setEditingTitle(storageData[idx].title);
  };

  const updateTitle = (e: object) => {
    if (editingTitle === "") return;
    if (e && "key" in e && e.key !== "Enter") return;

    const storageData = getStorageData();
    const idx = getIdx(storageData);
    storageData[idx].title = editingTitle;
    localStorage.setItem("boards", JSON.stringify(storageData));
    setNewTitle(editingTitle);
    setIsOpenBoardDialog(false);
  };

  useEffect(() => {
    setNewTitle(title);
  }, [title]);

  return (
    <div className="mt-10 p-6 w-auto bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="flex gap-2 p-3 rounded-lg mb-4">
        <p className="text-gray-800 font-medium text-sm break-all w-40">
          {newTitle}
        </p>
        <div className="flex gap-2">
          <Pencil
            size={16}
            className="text-gray-400 hover:text-blue-500 cursor-pointer transition-colors"
            onClick={() => editTitle()}
          />
          <X
            size={16}
            className="text-gray-400 hover:text-red-500 cursor-pointer transition-colors ml-auto"
          />
        </div>
      </div>
      <div className="border-b-2 mb-5"></div>
      <Todo id={id} />
      <div>
        <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
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
                  maxLength={300}
                  onChange={(e) =>
                    setDescription({ ...description, text: e.target.value })
                  }
                  onKeyDown={(e) => createTodo(e)}
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
        <Dialog open={isOpenBoardDialog} onOpenChange={setIsOpenBoardDialog}>
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
                  onChange={(e) => setEditingTitle(e.target.value)}
                  onKeyDown={(e) => updateTitle(e)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                className="bg-blue-500 hover:bg-blue-600 text-white"
                type="submit"
                onClick={updateTitle}
              >
                변경하기
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default Board;
