export interface BoardType {
  id: number;
  title: string;
  description?: DescriptionType[];
}

export interface DescriptionType {
  id: number;
  text: string;
}
