import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Board } from "@/types/board";

interface BoardState {
  boards: Board[];
  dragStartIndex: number | null;
  dragEndIndex: number | null;
  todoDragStartIndex: number | null;
  todoDragEndIndex: number | null;
  dragSourceBoardId: number | null;
  addBoard: (title: string) => void;
  editBoard: (id: number, title: string) => void;
  deleteBoard: (id: number) => void;
  addTodo: (boardId: number, text: string) => void;
  editTodo: (boardId: number, todoId: number, text: string) => void;
  deleteTodo: (boardId: number, todoId: number) => void;
  dragBoardStart: (idx: number) => void;
  dragBoardEnd: (idx: number) => void;
  dragTodoStart: (idx: number, boardId: number) => void;
  dragTodoEnd: (idx: number, boardId: number) => void;
}

export const useBoardStore = create<BoardState>()(
  persist(
    (set) => ({
      boards: [],
      dragStartIndex: null,
      dragEndIndex: null,
      todoDragStartIndex: null,
      todoDragEndIndex: null,
      dragSourceBoardId: null,

      dragBoardStart: (idx) => {
        set({ dragStartIndex: idx });
      },

      dragBoardEnd: (idx) => {
        set((state) => {
          if (state.dragStartIndex === null) return state;

          const newBoards = [...state.boards];
          const [draggedBoard] = newBoards.splice(state.dragStartIndex, 1);
          newBoards.splice(idx, 0, draggedBoard);

          return {
            boards: newBoards,
            dragStartIndex: null,
            dragEndIndex: null,
          };
        });
      },

      dragTodoStart: (idx: number, boardId: number) => {
        set({
          todoDragStartIndex: idx,
          dragSourceBoardId: boardId,
        });
      },

      dragTodoEnd: (idx: number, targetBoardId: number) => {
        set((state) => {
          const startIndex = state.todoDragStartIndex;
          const sourceBoardId = state.dragSourceBoardId;

          if (startIndex === null || sourceBoardId === null) {
            return state;
          }

          const newBoards = [...state.boards];
          const sourceBoardIndex = newBoards.findIndex(
            (board) => board.id === sourceBoardId
          );
          const targetBoardIndex = newBoards.findIndex(
            (board) => board.id === targetBoardId
          );

          if (sourceBoardIndex === -1 || targetBoardIndex === -1) {
            return state;
          }

          const todoToMove = {
            ...newBoards[sourceBoardIndex].contents[startIndex],
          };

          if (!todoToMove) {
            return state;
          }

          newBoards[sourceBoardIndex].contents = newBoards[
            sourceBoardIndex
          ].contents.filter((_, index) => index !== startIndex);

          newBoards[targetBoardIndex].contents.splice(idx, 0, todoToMove);

          return {
            ...state,
            boards: newBoards,
            todoDragStartIndex: null,
            dragSourceBoardId: null,
          };
        });
      },

      addBoard: (title) => {
        const trimmedTitle = title.trim();
        if (!trimmedTitle) return;

        set((state) => {
          const isDuplicate = state.boards.some(
            (board) => board.title === trimmedTitle
          );
          if (isDuplicate) return state;

          return {
            boards: [
              ...state.boards,
              { id: Date.now(), title: trimmedTitle, contents: [] },
            ],
          };
        });
      },

      editBoard: (id, title) =>
        set((state) => ({
          boards: state.boards.map((board) =>
            board.id === id ? { ...board, title: title.trim() } : board
          ),
        })),

      deleteBoard: (id) =>
        set((state) => ({
          boards: state.boards.filter((board) => board.id !== id),
        })),

      addTodo: (boardId, text) => {
        const trimmedText = text.trim();
        if (!trimmedText) return;

        set((state) => ({
          boards: state.boards.map((board) =>
            board.id === boardId
              ? {
                  ...board,
                  contents: [
                    ...board.contents,
                    { id: Date.now(), text: trimmedText },
                  ],
                }
              : board
          ),
        }));
      },

      editTodo: (boardId, todoId, text) =>
        set((state) => ({
          boards: state.boards.map((board) =>
            board.id === boardId
              ? {
                  ...board,
                  contents: board.contents.map((todo) =>
                    todo.id === todoId ? { ...todo, text: text.trim() } : todo
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
