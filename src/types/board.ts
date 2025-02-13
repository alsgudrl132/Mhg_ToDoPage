export interface Board {
  id: number;
  title: string;
}

export interface BoardDialogProps {
  isOpen: boolean;
  onClose: () => void;
}
