import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Team } from 'src/app/models/team';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  isEdit!: boolean;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: Team,
    public dialogRef: MatDialogRef<ModalComponent>,
  ) { }

  ngOnInit(): void {
    this.isEdit = this.data.id != null;
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
