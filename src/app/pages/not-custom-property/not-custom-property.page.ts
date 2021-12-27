import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-custom-property',
  templateUrl: './not-custom-property.page.html',
  styleUrls: ['./not-custom-property.page.scss'],
})
export class NotCustomPropertyPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  doRefresh(event) {
    console.log(`...refreshing`);
    setTimeout(() => {
      console.log('refreshing complete');
      event.target.complete();
    }, 2000);
  }

}
