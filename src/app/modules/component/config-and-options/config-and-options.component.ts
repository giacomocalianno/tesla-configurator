import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  computed,
  effect,
  signal,
} from '@angular/core';
import { ModelService } from '../../../services/model.service';
import { Subscription } from 'rxjs';
import {
  IConfig,
  IConfigResponse,
} from '../../../interfaces/config-and-options.interfaces';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-config-and-options',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './config-and-options.component.html',
  styleUrl: './config-and-options.component.scss',
})
export class ConfigAndOptionsComponent implements OnInit, OnDestroy {
  modelConfigSubscription!: Subscription;
  @ViewChild('includeTow') includeTow!: ElementRef;
  @ViewChild('includeYoke') includeYoke!: ElementRef;

  configsResponse = signal<IConfigResponse | null>(null);
  configs = signal<IConfig[] | null>(null);
  towHitch = signal<boolean>(false);
  yoke = signal<boolean>(false);
  selectedConfigId = signal<number | null>(
    this.modelService.selectedConfigId()
  );

  // setto il valore di partenza delle checkbox in base al valore dei signal sul service
  // per poterle prevalorizzare se sono state in precedenza checkate o meno
  towHitchFormControl: boolean = this.modelService.towHitch();
  yokeFormControl: boolean = this.modelService.yoke();

  imgSrc: string | null;

  // trovo sulla lista delle configs quella configurazione che ha lo stesso id della configurazione selezionata dall'utente
  selectedConfig = computed(() =>
    this.configsResponse()?.configs.find(
      (config) => config.id === this.selectedConfigId()
    )
  );

  constructor(private modelService: ModelService) {
    this.imgSrc = this.modelService.imgSrc();
  }

  ngOnInit(): void {
    // richiamo la lista delle configurazioni
    this.modelConfigSubscription = this.modelService
      .getModelConfig(this.modelService.chosenModel())
      .pipe()
      .subscribe((modelConfig) => {
        this.configsResponse.set(modelConfig);
        this.configs.set(modelConfig.configs);
        this.towHitch.set(modelConfig.towHitch);
        this.yoke.set(modelConfig.yoke);
      });
  }

  // funzione che gestisce il click sulla select
  handleClickConfig(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    const selectedConfig = element.value;

    this.selectedConfigId.set(parseInt(selectedConfig));
    this.modelService.selectedConfigId.set(this.selectedConfigId());
    this.modelService.selectedConfig.set(this.selectedConfig());
  }

  // funzione che gestisce il change della checkbox 'Tow hitch'
  handleChangeTow(isTowChecked: boolean) {
    // prendo il valore checked dalla template variable #includeTow
    this.modelService.towHitch.set(isTowChecked);
  }

  // funzione che gestisce il change della checkbox 'Yoke'
  handleChangeYoke(isYokeChecked: boolean) {
    // prendo il valore checked dalla template variable #includeYoke
    this.modelService.yoke.set(isYokeChecked);
  }

  // all'onDestroy faccio l'unsubscribe
  ngOnDestroy(): void {
    this.modelConfigSubscription.unsubscribe();
  }
}
