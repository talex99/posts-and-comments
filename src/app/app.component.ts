import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SpinnerComponent } from '@core-components';
import { HeaderComponent } from '@shared-components';

@Component({
  selector: 'app-root',
  imports: [SpinnerComponent, RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
