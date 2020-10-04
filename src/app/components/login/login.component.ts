import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public chatService:ChatService) { }

  ngOnInit() {
  }

  ingresar(proovedor:string){
    this.chatService.login(proovedor);
  }

}
