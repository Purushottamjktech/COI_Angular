import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  allowNewServer=false;
  serverCS = 'No server was created !';
  serverName = 'Testserver';
  serverCreated=false;
  servers=['testserver',]
  showSecret = false;

  constructor() { }

  ngOnInit(): void {
   }

  // onCreateServer(){
  //   this.serverCreated=true;
  //   this.servers.push(this.serverName);
  //   this.serverCS='server Was Created  ' + this.serverName;
  // }
  // onUpdateServerName(event:Event){
  //   this.serverName = (<HTMLInputElement>event.target).value;
    
  // }

  

  
  }
