import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { Path } from '@shared-enums';

@Component({
  selector: 'app-header',
  imports: [MatButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  //#region Dependencies

  private router = inject(Router);

  //#endregion

  //#region Properties

  path = Path;

  //#endregion

  //#region UI Methods

  onNavigateTo(path: Path): void {
    this.router.navigateByUrl(path);
  }

  //#endregion
}
