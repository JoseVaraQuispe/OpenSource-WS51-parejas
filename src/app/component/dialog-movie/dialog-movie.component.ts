import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Movie } from 'src/app/models/movie.model';

@Component({
  selector: 'app-dialog-movie',
  templateUrl: './dialog-movie.component.html',
  styleUrls: ['./dialog-movie.component.css']
})
export class DialogMovieComponent {
  @ViewChild('movieForm', { static: false })
  movieForm!: NgForm;

  movieData!: any;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data:any, private dialogRef: MatDialogRef<DialogMovieComponent>){
    this.movieData = {} as any;
    this.movieData = data;
  }
  closeDialog(){
    if(this.movieForm.form.valid){
      this.dialogRef.close(this.movieData);
    }
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }
}
