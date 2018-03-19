import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { DataService } from '../data.service';
import { Person } from '../person';


@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.scss']
})
export class PersonDetailsComponent implements OnInit {
  public people: Person[];
  public person: Person;

  public friends = [];
  public friendsOfFriends = [];
  public friendsOfFriendsUnique = [];
  public suggestedFriends = [];
  public suggestedFriendsUnique = [];

  public personLoaded: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private location: Location
  ) {}

  ngOnInit () {
    this.getPerson();
  }

  getPerson() {
    const id = +this.route.snapshot.paramMap.get('id');

    this.dataService.getData().subscribe(people => {
      this.people = people;

      this.person = people[id - 1];

      this.getFriends();

      this.personLoaded = true;
    });
  }

  getFriends () {
    // All friends
    this.friends = this.person.friends;

    // Friends of friends
    this.friends.forEach(friendOfFriend => this.friendsOfFriends.push(this.people[friendOfFriend - 1].friends));

    this.friendsOfFriends = [].concat.apply([], this.friendsOfFriends);

    this.friendsOfFriendsUnique = this.removeDuplicatesFromArray(this.friendsOfFriends);

    // Suggested friends
    this.suggestedFriends = this.findDuplicatesInArray(this.friendsOfFriends);

    this.suggestedFriendsUnique = this.removeDuplicatesFromArray(this.suggestedFriends);
  }

  goBack() {
    this.location.back();
  }

  // Helper functions
  findDuplicatesInArray (inputArray) {
    return inputArray.filter((item, position) => inputArray.indexOf(item) !== position);
  }

  removeDuplicatesFromArray (inputArray) {
    return inputArray.filter((item, position) => inputArray.indexOf(item) === position);
  }
}
