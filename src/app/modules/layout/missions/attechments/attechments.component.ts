import { Component, EventEmitter, Input, Output, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-attechments',
  templateUrl: './attechments.component.html',
  styleUrls: ['./attechments.component.css']
})
export class AttechmentsComponent {
  @Output() onClose: EventEmitter<any> = new EventEmitter<any>();
  @Input() from: any;
  myForm: FormGroup | any;
  isSidebarOpenClose: boolean = false;
  isEditing: boolean = false; // Flag to track whether it's an add or edit operation
  attechments: any = {};
  taskData: any;
  projectObj: any;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private toaster: ToastrService,
    private renderer: Renderer2,
    private spinner: NgxSpinnerService,
  ) {
    const storedData = localStorage.getItem('taskData');
    if (storedData) {
      this.taskData = JSON.parse(storedData);
    }
    const storedProjectData = localStorage.getItem('projectData');
    if (storedProjectData) {
      this.projectObj = JSON.parse(storedProjectData);
    }
  }


  ngOnInit(): void {
    this.attechments.isTrue = false;
    this.myForm = this.formBuilder.group({
      Name: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  // sidebar open close
  sidebarOpenClose() {
    this.isSidebarOpenClose = !this.isSidebarOpenClose;
    this.isSidebarOpenClose == true ? this.renderer.setStyle(document.body, 'overflow', 'hidden') : this.renderer.setStyle(document.body, 'overflow', 'auto');
    this.isSidebarOpenClose == true ? this.renderer.setStyle(document.body, 'background-color', 'rgba(0, 0, 0, 0.5)') : this.renderer.setStyle(document.body, 'background-color', 'auto');
    this.attechments = {};

  }

  onFormSubmit() {
    // Trigger validation for all form controls
    this.markFormGroupAsTouched(this.myForm);
    if (this.myForm!.valid && this.attechments.file) {
      this.spinner.show();
      const formData = new FormData();
      if (this.from === 'projectTask') {
        formData.append('ProjectTaskId', this.taskData.id);
      }
      formData.append('ProjectId', this.projectObj.id);
      formData.append('Name', this.myForm.value.Name);
      formData.append('status', this.myForm.value.status);
      formData.append('File', this.attechments.file);
      this.apiService.post('ProjectDocument', formData).subscribe((response) => {
        if (response.success) {
          this.toaster.success('Docsument uploaded Successfully!')
          // Emit the event when the child component is closed
          this.onClose.emit();
          this.spinner.hide();
          this.resetForm(); // Reset the form after successful add or update

        }
      });
    }
  }

  // Function to reset the form when adding new data
  resetForm() {
    this.myForm.reset();
    this.isEditing = false;
    this.sidebarOpenClose();
  }

  handleEventInChild(data: any) {
    this.sidebarOpenClose();
    this.myForm.patchValue(data);
    this.isEditing = true;
  }


  public dropped(files: NgxFileDropEntry[]) {
    this.attechments.isTrue = true;
    for (const droppedFile of files) {
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          this.attechments.file = file;
          this.attechments.name = file.name;
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
      }
    }
  }

  public fileOver(event: any) {
  }

  public fileLeave(event: any) {
  }

  public openFileSelector() {
    this.attechments.isTrue = true;
  }

  unLinkAttechment(event: any) {
    event.stopPropagation();
    this.attechments = {};
    this.attechments.isTrue = false;
  }

  getFileIconClass(fileName: string): string {
    const fileExtension: any = fileName.split('.').pop()?.toLowerCase();

    // Check if the file extension exists in the fileIcons mapping, otherwise use a default icon class
    return this.fileIcons[fileExtension] || 'bi-filetype-default';
  }

  fileIcons: { [extension: string]: string } = {
    doc: 'bi-filetype-doc',
    pdf: 'bi-filetype-pdf',
    jpg: 'bi-filetype-jpg',
    zip: 'bi-file-zip',
    png: 'bi-filetype-png',
    mp4: 'bi-filetype-mp3',
    // Add more mappings for other file types as needed
  };


  // Mark for check 
  private markFormGroupAsTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupAsTouched(control);
      }
    });
  }

}

