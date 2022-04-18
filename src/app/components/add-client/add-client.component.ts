import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Client } from 'src/app/models/Client';
import { ClientService } from 'src/app/services/client.service';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css'],
})
export class AddClientComponent implements OnInit {
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0,
  };

  disableBalanceOnAdd: boolean =
    this.settingsService.getSettings().disableBalanceOnAdd;
  @ViewChild('clientForm') form: NgForm;

  constructor(
    private flashMessage: FlashMessagesService,
    private clientService: ClientService,
    private router: Router,
    private settingsService: SettingsService
  ) {}

  ngOnInit() {}

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
      //Add a new Client
      this.clientService.newClient(value);
      //show msg
      this.flashMessage.show('New Client Added successfully!', {
        cssClass: 'alert-success',
        timeout: 4000,
      });
      //Rededirect to dash
      this.router.navigate(['/']);
    }
  }
}
