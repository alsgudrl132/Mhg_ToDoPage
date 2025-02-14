import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Board } from "@/types/board";

interface BoardState {
  boards: Board[];
  addBoard: (title: string) => void;
  editBoard: (id: number, title: string) => void;
  deleteBoard: (id: number) => void;
  addTodo: (boardId: number, text: string) => void;
  editTodo: (boardId: number, todoId: number, text: string) => void;
  deleteTodo: (boardId: number, todoId: number) => void;
}

export const useBoardStore = create<BoardState>()(
  persist(
    (set) => ({
      boards: [],

      addBoard: (title) =>
        set((state) => ({
          boards: [...state.boards, { id: Date.now(), title, contents: [] }],
        })),

      editBoard: (id, title) =>
        set((state) => ({
          boards: state.boards.map((board) =>
            board.id === id ? { ...board, title } : board
          ),
        })),

      deleteBoard: (id) =>
        set((state) => ({
          boards: state.boards.filter((board) => board.id !== id),
        })),

      addTodo: (boardId, text) =>
        set((state) => ({
          boards: state.boards.map((board) =>
            board.id === boardId
              ? {
                  ...board,
                  contents: [...board.contents, { id: Date.now(), text }],
                }
              : board
          ),
        })),

      editTodo: (boardId, todoId, text) =>
        set((state) => ({
          boards: state.boards.map((board) =>
            board.id === boardId
              ? {
                  ...board,
                  contents: board.contents.map((todo) =>
                    todo.id === todoId ? { ...todo, text } : todo
                  ),
                }
              : board
          ),
        })),

      deleteTodo: (boardId, todoId) =>
        set((state) => ({
          boards: state.boards.map((board) =>
            board.id === boardId
              ? {
                  ...board,
                  contents: board.contents.filter((todo) => todo.id !== todoId),
                }
              : board
          ),
        })),
    }),
    {
      name: "board-storage",
    }
  )
);
