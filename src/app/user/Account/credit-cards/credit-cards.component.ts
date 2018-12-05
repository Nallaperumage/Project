import { Component, OnInit, HostListener } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-credit-cards',
  templateUrl: './credit-cards.component.html',
  styleUrls: ['./credit-cards.component.scss']
})
export class CreditCardsComponent implements OnInit {

  handler:any;
  amount = 2000;

  constructor( private paymentSvc: AuthenticationService ) { }

  ngOnInit() {
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
    
    // document.getElementById('customButton').addEventListener('click', function(e) {
      // Open Checkout with further options:
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
