import { Component, inject } from '@angular/core';
import {
  MatProgressSpinner,
  MatProgressSpinnerModule,
} from '@angular/material/progress-spinner';
import { LoaderService } from '@core-services';

@Component({
  selector: 'app-spinner',
  imports: [MatProgressSpinnerModule, MatProgressSpinner],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss',
})
export class SpinnerComponent {
  //#region Dependencies

  public showLoader = inject(LoaderService).isLoaderDisplayed;

  //#endregion
}
