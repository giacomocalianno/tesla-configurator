export interface IModel {
  code: string;
  description: string;
  colors: IColor[];
}

export interface IColor {
  code: string;
  description: string;
  price: number;
}

export interface IModelsAndColors {
  [index: string]: {
    [index: string]: string;
  };
}
