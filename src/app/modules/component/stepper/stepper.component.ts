import {
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
  computed,
  effect,
  signal,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { ModelService } from '../../../services/model.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.scss',
})
export class StepperComponent implements OnInit {
  constructor(private modelService: ModelService) {
    effect(() =>
      console.log(
        'chosenModel from sessionStorage stepper: ',
        this.chosenModel()
      )
    );
    effect(() =>
      console.log(
        'chosenColor from sessionStorage stepper: ',
        this.chosenColor()
      )
    );
  }

  chosenModel = computed(() => this.modelService.chosenModel());
  chosenColor = computed(() => this.modelService.chosenColorCode());
  selectedConfig = computed(() => this.modelService.selectedConfig());
  isStepOneCompleted = computed(() => this.chosenModel() && this.chosenColor());
  isStepTwoCompleted = computed(() => this.modelService.selectedConfig());

  ngOnInit(): void {}
}
