import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housing-location';
import { HousingService } from '../housing.service';
@Component({
  selector: 'app-home',
  imports: [CommonModule, HousingLocationComponent],
  template: `
    <section>
      <form>
        <input type="text" placeholder="Filter by city" #filter>
        <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
      </form>
      <section class="results">
      <app-housing-location  *ngFor="let housingLocation of filteredLocationList" [housingLocation]="housingLocation"/>
      </section>
    </section>
  `,
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
   
   housingLocationList : HousingLocation[] = [];
   filteredLocationList : HousingLocation[]=[];
   private housingService = inject(HousingService);
   constructor(){
    this.housingService.getAllHousingLocations().then((housingLocationList : HousingLocation[])=>{
        this.housingLocationList=housingLocationList;
        this.filteredLocationList=housingLocationList;
        console.log(this.filteredLocationList);
    })
  }
  filterResults(text : string){
    if(!text){
      this.filteredLocationList=this.housingLocationList;
      return;
    }
    this.filteredLocationList=this.housingLocationList.filter((housingLocation)=>{
      return housingLocation?.city.toLowerCase().includes(text);
    });
  }
}
