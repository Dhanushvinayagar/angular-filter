import { Component, DoCheck, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { DataService } from '../Services/data.service';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})


export class MoviesComponent implements OnInit  {
  
  totalboxoffice : number =0

  displayedColumns: string[] = ['id', 'Movie Title', 'Genre', 'Release Year', 'Director', 'Rating', 'State', 'District', 'Taluk', 'Box Office Collections (in Crores)']
  dataSource !: MatTableDataSource<any>;
  
  @ViewChild(MatPaginator)  paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;


  constructor(private dataService:DataService){ 
  }

  inputArray !: string[] ;
  filterArray !: string[] ;

                        

  getMovieList(){
    let movieData ;
    this.dataService.getData().subscribe(
      res =>{
        movieData = res.movies; 
        this.dataSource = new MatTableDataSource(movieData);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

        movieData.map((data : any)=>{   
            this.totalboxoffice+=data['Box Office Collections (in Crores)']
        })
      }
    )  
  }

  ngOnInit(): void {
    this.getMovieList()
    this.filterArray = this.dataService.getFilter()
    this.inputArray  = this.dataService.getInput()
  }

    dropdownCache : { [key: string]: string[] } = {}; // Cache object to store generated dropdown options

    getDropdown(value: string): string[] {
              if (!this.dataSource) return [];

              if (this.dropdownCache[value]) {
                  return this.dropdownCache[value]; // Return cached options
              }

              const set = new Set<string>();
              if (this.dataSource) {
                  this.dataSource.filteredData.filter((el) => {
                      set.add(el[value]);
                  });
              }
              const options = [...set]; // Convert Set to array
              this.dropdownCache[value] = options; // Store options in cache
  
              return options;
    }


  // applyFilter(event: Event) {
    
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();

  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  //   // box office update
  //   this.totalboxoffice = 0
  //   if(this.dataSource){
  //     this.dataSource.filteredData.map((data : any)=>{   
  //       this.totalboxoffice+=data['Box Office Collections (in Crores)']
  //     })
  //   }
  // }

  applyFilter(value : string | number) {
    const filterValue = value;
    if(typeof value == "string"){
      this.dataSource.filter = (filterValue as string).trim().toLowerCase();
    }
    if(typeof value == "number"){
      this.dataSource.filter  = filterValue.toString()
    }
    
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    // box office update
    this.totalboxoffice = 0
    if(this.dataSource){
      this.dataSource.filteredData.map((data : any)=>{   
        this.totalboxoffice+=data['Box Office Collections (in Crores)']
      })
    }
  }
  
}
