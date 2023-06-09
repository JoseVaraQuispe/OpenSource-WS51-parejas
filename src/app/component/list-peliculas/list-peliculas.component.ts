import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Movie } from 'src/app/models/movie.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import * as _ from 'lodash';
import { MatDialog } from '@angular/material/dialog';
import { DialogMovieComponent } from '../dialog-movie/dialog-movie.component';

@Component({
  selector: 'app-list-peliculas',
  templateUrl: './list-peliculas.component.html',
  styleUrls: ['./list-peliculas.component.css'],
})
export class ListPeliculasComponent {
  @ViewChild('movieForm', { static: false })

  movieData!: Movie;

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = [
    'id',
    'name',
    'photo',
    'duracion',
    'genero',
    'actions',
  ];

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  isEditMode = false;

  @ViewChild(MatSort)
  sort!: MatSort;

//
  totalDuration = 0;
   totalMovies = 0;
//
constructor(private router: Router, private MovieService: MovieService, public dialog: MatDialog) {
    this.movieData = {} as Movie;
  }

  openDialog(element?:any){
    let dialogRef = this.dialog.open(DialogMovieComponent,{data: {...element, operation: !!element?"Editar": "Agregar"}})
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.movieData = result;
        if (this.isEditMode) {
          console.log('Update');
          this.updateMovie();
        } else {
          console.log('Create');
          this.addMovie();
        }
        this.isEditMode = false;
      }
    })
    return dialogRef;
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getAllMovies();
  }

  getAllMovies() {
    this.MovieService.getList().subscribe((response: any) => {
      this.dataSource.data = response;
      this.updateTotalDurationAndMovies();
    });
  }

  editItem(element: any) {
    this.movieData = _.cloneDeep(element);
    this.isEditMode = true;
    this.openDialog(element);
  }

  addNew() {
    this.openDialog();
  }


  deleteItem(id: string) {
    this.MovieService.deleteItem(id).subscribe((reposnse: any) => {
      this.dataSource.data = this.dataSource.data.filter((o: any) => {
        return o.id !== id ? o : false;
      });
    });
  }

  addMovie() {
    this.movieData.id = 0;
    this.MovieService.createItem(this.movieData).subscribe((response: any) => {
      this.dataSource.data.push({ ...response });
      this.dataSource.data = this.dataSource.data.map((o: any) => {
        return o;
      });

      this.updateTotalDurationAndMovies();
    });

  }

  updateMovie() {
    this.MovieService.updateItem(this.movieData.id, this.movieData).subscribe(
      (response: any) => {
        this.dataSource.data = this.dataSource.data.map((o: any) => {
          if (o.id == response.id) {
            o = response;
          }
          return o;
        });

        this.updateTotalDurationAndMovies();
      }
    );
  }

  listPeliculas() {
    this.router.navigateByUrl('/business/peliculas');
  }


   //
   
  updateTotalDurationAndMovies() { //string convertir 
  this.totalMovies = this.dataSource.data.length;
  this.totalDuration = this.dataSource.data.reduce((sum: number, movie: any) => {
      return sum + parseInt(movie.duracion);
      }, 0);
    }
}


