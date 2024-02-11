import { Component, OnDestroy, OnInit, computed, signal } from '@angular/core';
import { ModelService } from '../../../services/model.service';
import { IConfig } from '../../../interfaces/config-and-options.interfaces';
import { CommonModule } from '@angular/common';
import { IColor } from '../../../interfaces/choose-mode-color.interfaces';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss',
})
export class SummaryComponent implements OnInit, OnDestroy {
  chosenModelDescription = signal<string | null>(null);
  selectedConfig = signal<IConfig | undefined>(undefined);
  chosenColor = signal<IColor | null>(null);
  imgSrc!: string | null;
  towHitch = signal<boolean>(false);
  yoke = signal<boolean>(false);

  towHitchCost = signal<number>(1000);
  yokeCost = signal<number>(1000);

  totalCost = computed(
    () =>
      (this.selectedConfig()?.price ?? 0) +
      (this.chosenColor()?.price ?? 0) +
      (this.towHitch() ? this.towHitchCost() : 0) +
      (this.yoke() ? this.yokeCost() : 0)
  );

  constructor(private modelService: ModelService) {}

  ngOnInit(): void {
    this.chosenModelDescription.set(this.modelService.chosenModelDescription());
    this.selectedConfig.set(this.modelService.selectedConfig());
    this.chosenColor.set(this.modelService.chosenColor());
    this.imgSrc = this.modelService.imgSrc();
    this.towHitch.set(this.modelService.towHitch());
    this.yoke.set(this.modelService.yoke());
  }

  ngOnDestroy(): void {
    // TODO fare unsubscribe
  }
}
