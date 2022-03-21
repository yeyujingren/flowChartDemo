export interface Shape {
  id: string;
  height: number;
  width: number;
  type: string
}

export interface SelectStack {
  newSelection: [Shape?],
  oldSelection: [Shape?]
}

export interface RemoveEle {
  element: Shape
}