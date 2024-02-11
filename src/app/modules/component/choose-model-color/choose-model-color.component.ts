import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  computed,
  signal,
} from '@angular/core';
import { Subscription, filter } from 'rxjs';
import {
  IModel,
  IModelsAndColors,
} from '../../../interfaces/choose-mode-color.interfaces';
import { ModelService } from '../../../services/model.service';

@Component({
  selector: 'app-choose-model-color',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './choose-model-color.component.html',
  styleUrl: './choose-model-color.component.scss',
})
export class ChooseModelColorComponent implements OnInit, OnDestroy {
  modelSubscription!: Subscription;
  models = signal<IModel[]>([]);
  chosenModel = signal<string | null>(this.modelService.chosenModel());
  chosenColorCode = signal<string | null>(this.modelService.chosenColorCode());
  imgSrc = signal<string | null>(this.modelService.imgSrc());

  // creo un oggetto dove per ogni modello è mappato il suo colore con l'immagine di riferimento jpg
  modelsAndColors: IModelsAndColors = {
    C: {
      black: '../../../../assets/C/black.jpg',
      grey: '../../../../assets/C/grey.jpg',
      white: '../../../../assets/C/white.jpg',
    },
    S: {
      black: '../../../../assets/S/black.jpg',
      blue: '../../../../assets/S/blue.jpg',
      grey: '../../../../assets/S/grey.jpg',
      red: '../../../../assets/S/red.jpg',
      white: '../../../../assets/S/white.jpg',
    },
    X: {
      black: '../../../../assets/X/black.jpg',
      blue: '../../../../assets/X/blue.jpg',
      grey: '../../../../assets/X/grey.jpg',
      red: '../../../../assets/X/red.jpg',
      white: '../../../../assets/X/white.jpg',
    },
    '3': {
      black: '../../../../assets/3/black.jpg',
      blue: '../../../../assets/3/blue.jpg',
      grey: '../../../../assets/3/grey.jpg',
      red: '../../../../assets/3/red.jpg',
      white: '../../../../assets/3/white.jpg',
    },
    Y: {
      black: '../../../../assets/Y/black.jpg',
      blue: '../../../../assets/Y/blue.jpg',
      grey: '../../../../assets/Y/grey.jpg',
      red: '../../../../assets/Y/red.jpg',
      white: '../../../../assets/Y/white.jpg',
    },
  };

  // quando viene scelto il modello viene chiamato il computed che cerca nella lista dei modelli tornati
  // e se il campo 'code' corrisponde al modello selezionato, ritorno la lista dei possibili colori per quel modello selezionato
  colors = computed(
    () =>
      this.models().find((model) => model.code === this.chosenModel())?.colors
  );

  chosenColorObject = computed(() =>
    this.colors()?.find((color) => color.code === this.chosenColorCode())
  );

  getModelDescription = computed(
    () =>
      this.models().find((model) => model.code === this.chosenModel())
        ?.description
  );

  constructor(private modelService: ModelService) {}

  ngOnInit(): void {
    // faccio la chiamata che ritorna la lista dei modelli
    this.modelSubscription = this.modelService
      .getModels()
      .pipe(filter((res) => !!res))
      .subscribe((models) => {
        // setto il valore del signal 'models' coi modelli tornati dal backend
        this.models.set(models);
      });
  }

  // funzione che gestisce il click del modello
  handleClickModel(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    const clickedModel = element.value;

    // quando cambio il modello resetto il valore delle variabili sul service
    // cosi non prevalorizza le config con le configurazioni per il modello precedente
    this.modelService.selectedConfig.set(undefined);
    this.modelService.selectedConfigId.set(null);
    this.modelService.chosenColor.set(null);
    this.modelService.towHitch.set(false);
    this.modelService.yoke.set(false);

    // setto il valore del signal 'chosenModel' col codice del modello scelto
    this.chosenModel.set(clickedModel);

    // questa parte di codice gestisce il click sul modello e seleziona automaticamente il primo valore di colore
    // se c'è la lista dei colori
    if (this.colors()) {
      // assegno il valore del signal dei colori alla variabile 'colorSignal'
      const colorSignal = this.colors();

      // se colorSignal è popolato prendo il primo colore nella lista e ritorno il code
      const colorSignalCode = colorSignal && colorSignal[0].code;
      const colorSignalPrice = colorSignal && colorSignal[0].price;

      // assegno al signal del colore scelto, il primo colore trovato per quel modello
      this.chosenColorCode.set(colorSignalCode ?? '');

      // setto il valore del signal 'imgSrc', vado a prendere nell'oggetto modelsAndColors il modello selezionato e il colore assegnato
      // e torno cosi il link all'immagine da visualizzare
      this.imgSrc.set(
        this.modelsAndColors[`${this.chosenModel()}`][
          `${this.chosenColorCode()}`
        ]
      );

      // salvo sul service i valori dei signal per poter prevalorizzare
      this.modelService.chosenModel.set(this.chosenModel());
      this.modelService.chosenColorCode.set(this.chosenColorCode());
      this.modelService.chosenColorPrice.set(colorSignalPrice ?? null);
      this.modelService.imgSrc.set(this.imgSrc());
      this.modelService.chosenModelDescription.set(
        this.getModelDescription() ?? ''
      );
    }
  }

  // funzione che gestisce il click del colore
  handleClickColor(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    const clickedColor = element.value;

    // setto il valore del signal 'chosenColorCode' col codice del colore scelto
    this.chosenColorCode.set(clickedColor);

    // setto il valore del signal 'imgSrc', vado a prendere nell'oggetto modelsAndColors il modello selezionato e il colore assegnato
    // e torno cosi il link all'immagine da visualizzare
    this.imgSrc.set(
      this.modelsAndColors[`${this.chosenModel()}`][`${this.chosenColorCode()}`]
    );

    // salvo sul service i valori dei signal per poter prevalorizzare
    this.modelService.chosenModel.set(this.chosenModel());
    this.modelService.chosenColor.set(this.chosenColorObject() ?? null);
    this.modelService.chosenColorCode.set(this.chosenColorCode());
    this.modelService.imgSrc.set(this.imgSrc());
  }

  // all'ondestroy faccio tutte le unsubscribe
  ngOnDestroy(): void {
    this.modelSubscription.unsubscribe();
  }
}
