import { Component } from '@angular/core';
import { HeaderComponent } from '../../../components/header/header.component';
import { Level2HeaderComponent } from '../../components/level-2-header/level-2-header.component';
import { DocFormComponent } from '../components/doc-form/doc-form.component';

@Component({
  selector: 'app-add-document',
  standalone: true,
  imports: [HeaderComponent, Level2HeaderComponent, DocFormComponent],
  templateUrl: './add-document.component.html',
  styleUrl: './add-document.component.scss',
})
export class AddDocumentComponent {
  headerText: string = 'Add New Document';
}