import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Client } from 'src/app/models/Client';
import { ClientService } from 'src/app/services/client.service';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css'],
})
export class EditClientComponent implements OnInit {
  id: string;
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0,
  };
  disableBalanceOnAdd: boolean = false;
  showBalanceUpdateInput: boolean = false;
  disableBalanceOnEdit: boolean;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService,
    private settingsService: SettingsService
  ) {}

  ngOnInit() {
    this.disableBalanceOnEdit =
      this.settingsService.getSettings().disableBalanceOnEdit;
    // get id
    this.id = this.route.snapshot.params['id'];

    //get client-details
    this.clientService.getClient(this.id).subscribe((client: Client) => {
      this.client = client;
    });
  }

  onSubmit({ value, valid }: { value: Client; valid: boolean }) {
    if (this.disableBalanceOnAdd) {
      value.balance = 0;
    }

    if (!valid) {
      //show error
      this.flashMessage.show('Please fill a form correctlly!', {
        cssClass: 'alert-danger',
        timeout: 4000,
      });
    } else {
      //Add a edit Client
      value.id = this.id;
      this.clientService.updateClient(value);
      //show msg
      this.flashMessage.show('Update Client  successfully!', {
        cssClass: 'alert-success',
        timeout: 4000,
      });
      //Rededirect to dash
      this.router.navigate(['/']);
    }
  }
}
