import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from '../../../services/common-service.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  blogs: any = [];
  constructor(public commonService: CommonServiceService) {}

  ngOnInit(): void {
  }
}
