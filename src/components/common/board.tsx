import { Pencil, Plus, X } from "lucide-react";
import React from "react";
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

function Board() {
  return (
    <div className="mt-10 p-6 w-auto bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="flex gap-2 p-3 rounded-lg mb-4">
        <p className="text-gray-800 font-medium text-sm break-all w-40">제목</p>
        <div className="flex gap-2">
          <Pencil
            size={16}
            className="text-gray-400 hover:text-blue-500 cursor-pointer transition-colors"
          />
          <X
            size={16}
            className="text-gray-400 hover:text-red-500 cursor-pointer transition-colors ml-auto"
          />
        </div>
      </div>
      <div className="border-b-2 mb-5"></div>
      <Todo />
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
                  maxLength={300}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                className="bg-blue-500 hover:bg-blue-600 text-white"
                type="submit"
              >
                추가하기
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Dialog>
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
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                className="bg-blue-500 hover:bg-blue-600 text-white"
                type="submit"
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
