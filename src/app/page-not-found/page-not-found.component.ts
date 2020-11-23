import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  template: `
  <div class="container" style="margin:2rem;">
    <p style="font-weight:bolder;text-align:center;color:red;font-size:1rem">
      page-not-found 
    </p>
  </div>
  `,
  styles: [
  ]
})
export class PageNotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
