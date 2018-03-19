import { Component, OnInit } from '@angular/core';

import { DataService } from '../data.service';
import { Person } from '../person';


@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {
  public people: Person[];
  
  constructor(private dataService: DataService) {}

  ngOnInit () {
    this.getPeople();
  }

  getPeople () {
    this.dataService.getData().subscribe(people => {
      this.people = people;
    });
  }
}
