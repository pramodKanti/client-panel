import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(private clientService: ClientService) {}

  ngOnInit() {
    this.clientService.getClients().subscribe((clients) => {
      console.log(clients);
    });
  }
}
