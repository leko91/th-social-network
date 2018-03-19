import { Component, Input, OnInit } from '@angular/core';

import { DataService } from '../data.service';
import { Person } from '../person';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {
  @Input() person;

  public people: Person[];
  public friends = [];
  public friendsOfFriends = [];
  public friendsOfFriendsUnique = [];
  public suggestedFriends = [];
  public suggestedFriendsUnique = [];
  public friendsLoaded: boolean = false;

  constructor(private dataService: DataService) {}

  ngOnInit () {
    this.getPeople();
  }

  getPeople () {
    this.dataService.getData().subscribe(people => {
      this.people = people;
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

    this.friendsLoaded = true;
  }

  // Helper functions
  findDuplicatesInArray (inputArray) {
    return inputArray.filter((item, position) => inputArray.indexOf(item) !== position);
  }

  removeDuplicatesFromArray (inputArray) {
    return inputArray.filter((item, position) => inputArray.indexOf(item) === position);
  }
}
