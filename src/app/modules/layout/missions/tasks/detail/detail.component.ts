import { Component } from '@angular/core';

interface Comment {
  id: number;
  profilePhoto: string;
  userName: string;
  time: string;
  commentDescription: string;
}

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent {

  comments: Comment[] = [
    {
      id: 1,
      profilePhoto: 'url-to-profile-photo1',
      userName: 'User1',
      time: '2 hours ago',
      commentDescription: 'This is the first comment.'
    },
    {
      id: 2,
      profilePhoto: 'url-to-profile-photo2',
      userName: 'User2',
      time: '1 day ago',
      commentDescription: 'Another comment here.'
    },
    // Add more comments as needed
  ];

}
