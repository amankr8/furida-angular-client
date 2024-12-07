import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DocumentService } from '../../../../../service/document/document.service';
import { Project } from '../../../../../interface/project';
import { ProjectService } from '../../../../../service/project/project.service';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-doc-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatOptionModule,
    MatSelectModule,
  ],
  templateUrl: './doc-form.component.html',
  styleUrl: './doc-form.component.scss',
})
export class DocFormComponent {
  form!: FormGroup;
  projects: Project[] = [];
  fileName: string = '';
  isLoading = false;
  private snackBarRef = inject(MatSnackBar);
  private maxFileSize = 5 * 1024 * 1024;

  constructor(
    private docService: DocumentService,
    private projectService: ProjectService,
    private router: Router
  ) {}

  ngOnInit() {
    this.projectService.getAllProjects().subscribe((data) => {
      this.projects = data;
    });
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      desc: new FormControl('', Validators.required),
      file: new FormControl(null, Validators.required),
      projectId: new FormControl(null, Validators.required),
    });
  }

  resetForm() {
    this.form.reset();
    this.fileName = '';
  }

  onFileSelect(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      // Check if the file type is an image
      if (file.type !== 'application/pdf') {
        alert('Only image files are allowed!');
        fileInput.value = ''; // Clear the input if the file is not in pdf format
      } else if (file.size > this.maxFileSize) {
        alert('File size is too large!');
        fileInput.value = ''; // Clear the input if the file is too large
      } else {
        this.form.patchValue({ file: file });
        this.fileName = file.name;
      }
    }
  }

  submit() {
    this.isLoading = true;

    const docData = new FormData();
    docData.append('name', this.form.get('name')?.value);
    docData.append('desc', this.form.get('desc')?.value);
    docData.append('file', this.form.get('file')?.value);
    docData.append('projectId', this.form.get('projectId')?.value);

    this.docService.addDocument(docData).subscribe({
      next: (res) => {
        this.router.navigate(['/admin/documents']);
        this.snackBarRef.open('Document uploaded successfully!', 'Dismiss', {
          duration: 3000,
        });
      },
      error: (err) => {
        console.error(err);
        this.snackBarRef.open('An unknown error has occurred', 'Dismiss', {
          duration: 3000,
        });
        this.resetForm();
        this.isLoading = false;
      },
    });
  }
}