import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css'],
  encapsulation: ViewEncapsulation.Emulated
  
})
export class ServersComponent implements OnInit {
  // serverId: number = 10;
  // serverStatus: string = 'offline';
 @Input('srvElement') element!: { type: string; name: string; content: string; };


  constructor() {
    console.log('constructer called')
    // this.serverStatus = Math.random() > 0.5 ? 'online' : 'offline';
  }
  

  ngOnInit(): void {
    console.warn('ngoninit called');
    

  }

  // getServerStatus() {
  //   return this.serverStatus;
  // }

  // getColor(){
  //   return this.serverStatus==='online'?'Green':'red';
  // }
}
