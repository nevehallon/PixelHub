import { GOP } from "./genericObjectProps";

export interface Drawing extends GOP {
  drawingName: string;
  description: string;
  grid: { fill: string; touched: string }[];
  _id?: string;
  painterInfo?: GOP;
  drawingNumber?: string | number;
}
