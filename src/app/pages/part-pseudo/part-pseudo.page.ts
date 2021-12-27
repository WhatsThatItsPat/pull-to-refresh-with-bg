import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-part-pseudo',
  templateUrl: './part-pseudo.page.html',
  styleUrls: ['./part-pseudo.page.scss'],
})
export class PartPseudoPage implements OnInit {

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
