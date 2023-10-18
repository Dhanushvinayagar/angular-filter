import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { DataService } from '../Services/data.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  fieldArray:string[]=[]
  filterArray:string[]=[]

  displayArray:string[]=[]
  inputValues: string[] = [];

  constructor(private dataService : DataService){
      
  }

  ngOnInit(): void {

    console.log(this.dataService.inputArray,this.dataService.filterTitle);

  
    this.displayArray=this.dataService.filterTitle
    
    this.inputValues =this.dataService.inputArray
    
      this.dataService.getFilterSelect().subscribe(res=>{
        this.fieldArray = Object.keys(res.movies[0])
        this.filterArray = Object.keys(res.movies[0]).filter(x => !this.displayArray.includes(x)); 
      }) 
     
  }


  onInputChange(){
    this.dataService.inputArray = this.inputValues 
  }

  onOptionsChange(value : string,index : number){
    this.displayArray[index] = value
    this.dataService.filterTitle =  this.displayArray 
    this.filterArray = this.fieldArray.filter(x => !this.displayArray.includes(x));   
  }

  addFilter(){
      this.inputValues.push("")
      this.dataService.inputArray =this.inputValues
      this.displayArray.push("id")
      this.dataService.filterTitle =  this.displayArray 
      this.filterArray = this.fieldArray.filter(x => !this.displayArray.includes(x));       
  }

  deleteFilter(index:number){
      this.inputValues.splice(index, 1);
      this.dataService.inputArray =this.inputValues
      this.displayArray.splice(index, 1);
      this.dataService.filterTitle =  this.displayArray   
      this.filterArray = this.fieldArray.filter(x => !this.displayArray.includes(x));             
  }

}
