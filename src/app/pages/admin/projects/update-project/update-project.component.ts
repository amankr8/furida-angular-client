import { Component, Inject, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Project } from '../../../../interface/project';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { Action, Store } from '@ngrx/store';
import { DeleteDialogComponent } from '../../components/delete-dialog/delete-dialog.component';
import { updateProject } from '../../../../store/actions/project.actions';

@Component({
  selector: 'app-update-project',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    CommonModule,
  ],
  templateUrl: './update-project.component.html',
  styleUrl: './update-project.component.scss',
})
export class UpdateProjectComponent {
  form!: FormGroup;

  constructor(
    public store: Store,
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: Project
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(this.data.name, Validators.required),
      desc: new FormControl(this.data.desc, Validators.required),
      address: new FormControl(this.data.address, Validators.required),
    });
  }

  submit() {
    const updatedProject = {
      ...this.data,
      name: this.form.value.name,
      desc: this.form.value.desc,
      address: this.form.value.address,
    };
    this.store.dispatch(updateProject({ project: updatedProject }));
    this.dialogRef.close();
  }
}
