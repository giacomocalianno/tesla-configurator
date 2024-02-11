import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { IColor, IModel } from '../interfaces/choose-mode-color.interfaces';
import {
  IConfig,
  IConfigResponse,
} from '../interfaces/config-and-options.interfaces';

@Injectable({
  providedIn: 'root',
})
export class ModelService {
  constructor(private http: HttpClient) {}

  chosenModel = signal<string | null>(null);
  chosenModelDescription = signal<string | null>(null);

  chosenColor = signal<IColor | null>(null);
  chosenColorCode = signal<string | null>(null);
  chosenColorPrice = signal<number | null>(null);

  imgSrc = signal<string | null>(null);

  selectedConfigId = signal<number | null>(null);
  selectedConfig = signal<IConfig | undefined>(undefined);

  towHitch = signal<boolean>(false);
  yoke = signal<boolean>(false);

  getModels() {
    return this.http.get<IModel[]>('/models');
  }

  getModelConfig(modelCode: string | null) {
    return this.http.get<IConfigResponse>(`/options/${modelCode}`);
  }
}
