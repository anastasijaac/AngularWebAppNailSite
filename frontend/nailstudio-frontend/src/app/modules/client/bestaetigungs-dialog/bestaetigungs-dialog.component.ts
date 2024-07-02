import {Component, OnInit} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-bestaetigungs-dialog',
  standalone: true,
  imports: [],
  templateUrl: './bestaetigungs-dialog.component.html',
  styleUrl: './bestaetigungs-dialog.component.css'
})
export class BestaetigungsDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<BestaetigungsDialogComponent>) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.closeDialog();
    }, 5000); // 5 seconds
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
