import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-audio-upload',
  templateUrl: './audio-upload.component.html',
  styleUrls: ['./audio-upload.component.scss']
})
export class AudioUploadComponent implements OnInit {

  myFiles: string[] = [];
  httpService: any;
  sMsg: string;

  constructor() { }

  ngOnInit() {
  }


  getFileDetails(dir) {
    console.log(dir.target.files);

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < dir.target.files.length; i++) {
      this.myFiles.push(dir.target.files[i]);
    }

  }


  uploadFiles() {
    const frmData = new FormData();

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.myFiles.length; i++) {
      frmData.append('fileUpload', this.myFiles[i]);
    }

    this.httpService.post('http://localhost:4000/api/upload/', frmData).subscribe(
      data => {
        // SHOW A MESSAGE RECEIVED FROM THE WEB API.
        this.sMsg = data as string;
        console.log(this.sMsg);
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);    // Show error, if any.
      }
    );
  }
}