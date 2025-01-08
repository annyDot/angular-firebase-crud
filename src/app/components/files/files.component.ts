import { Component, OnInit } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FileService } from 'src/app/shared/services/file.service';

//icons
import { faFile } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-files',
    templateUrl: './files.component.html',
    styleUrls: ['./files.component.css'],
    standalone: false
})
export class FilesComponent implements OnInit {
  filesIcon = faFile;

  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';

  fileInfos?: Observable<any>;

  constructor(private fileService: FileService) {}

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    this.progress = 0;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this.fileService.upload(this.currentFile).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round((100 * event.loaded) / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.fileInfos = this.fileService.getFiles();
            }
          },
          (err: any) => {
            console.log(err);
            this.progress = 0;

            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload file!';
            }

            this.currentFile = undefined;
          }
        );
      }

      this.selectedFiles = undefined;
    }
  }

  ngOnInit(): void {
    this.fileInfos = this.fileService.getFiles();
  }
}
