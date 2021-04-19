import { GenericObjectProps } from "./genericObjectProps";

export interface Drawing {
  drawingName: string;
  description: string;
  grid: { fill: string; touched: string }[];
  _id?: string;
  painterInfo: GenericObjectProps;
  drawingNumber: string | number;
  // TODO:
}
