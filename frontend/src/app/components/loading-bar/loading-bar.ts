import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-loading-bar',
  imports: [
    MatCardModule,
    MatProgressBarModule
  ],
  templateUrl: './loading-bar.html',
  styleUrl: './loading-bar.scss',
})
export class LoadingBar {}
