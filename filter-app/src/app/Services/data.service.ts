import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor(private http:HttpClient) { }

  inputArray:string[] = ["Genre",
  "Director",
  "Release Year",
  "State"
  ]
  filterTitle: string[] = [ 
    "Genre",
    "Director",
    "Release Year",
    "State"
  ]

  getInput() : string[]{
      return this.inputArray
  }

  getFilter(){
    return this.filterTitle
  }

  getData():Observable<any>{
    const data = this.http.get('https://run.mocky.io/v3/f6799f1a-c180-44a2-87de-9b1a0319e325')
    // const data = this.http.get("http://localhost:3000/movies")
    return data;   
  }

  getFilterSelect():Observable<any>{
    
      const data = this.http.get('https://run.mocky.io/v3/f6799f1a-c180-44a2-87de-9b1a0319e325')
      // const data = this.http.get("http://localhost:3000/movies")
      return data;      
  }
}
