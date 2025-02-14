export interface Board {
  id: number;
  title: string;
  contents: Content[];
}

export interface Content {
  id: number;
  text: string;
}
