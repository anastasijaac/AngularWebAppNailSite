import { Component } from '@angular/core';
import {MatAnchor, MatButtonModule} from "@angular/material/button";
import {MatToolbar, MatToolbarModule} from "@angular/material/toolbar";
import {RouterLink, RouterLinkActive, RouterModule} from "@angular/router";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar-mitarbeiter',
  standalone: true,
  templateUrl: './navbar-mitarbeiter.component.html',
  styleUrls: ['./navbar-mitarbeiter.component.css'],
    imports: [
      CommonModule,
      RouterModule,
      MatToolbarModule,
      MatButtonModule
    ],

})
export class NavbarMitarbeiterComponent {}
