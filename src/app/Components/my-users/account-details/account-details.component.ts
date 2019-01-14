import { Component, OnInit, HostListener } from '@angular/core';
import { AuthenticationService, UserDetails } from '../../../Services/authentication.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent implements OnInit {

  details: UserDetails;

  handler:any;
  amount = 2000;

  constructor( private auth: AuthenticationService, private paymentSvc: AuthenticationService ) { }

  ngOnInit() {
    this.details = this.auth.getUserDetails();

    this.handler = StripeCheckout.configure({
      key: environment.stripeKey,
      image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
      locale: 'auto',
      token: token => {
        this.paymentSvc.processPayment(token, this.amount);
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
      }
    });
  }

  handlePayment() {
    this.handler.open({
      name: 'Demo Site',
      description: '2 widgets',
      amount: this.amount
    });
    //   e.preventDefault();
    // });
  }
    
    // Close Checkout on page navigation:
  @HostListener('window:popstate')
  onPopstate() {
    // window.addEventListener('popstate', function() {
      this.handler.close();
    // });
  }

}
