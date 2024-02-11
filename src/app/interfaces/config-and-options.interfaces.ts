export interface IConfigResponse {
  configs: IConfig[];
  towHitch: boolean;
  yoke: boolean;
}

export interface IConfig {
  id: number;
  description: string;
  range: number;
  speed: number;
  price: number;
}
