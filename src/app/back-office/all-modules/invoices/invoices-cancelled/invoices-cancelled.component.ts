import { Component, OnInit, ViewChild } from '@angular/core';
import * as Feather from 'feather-icons';
declare const $: any;

@Component({
  selector: 'app-invoices-cancelled',
  templateUrl: './invoices-cancelled.component.html',
  styleUrls: ['./invoices-cancelled.component.css']
})
export class InvoicesCancelledComponent implements OnInit {
  select_box_open:any = []

  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    Feather.replace();
  }
  public delete(){
    $('#delete_paid').modal('hide');
  }

  // Checkbox Select

  public openBox(val: any): void {

    if (this.select_box_open[0] != val) {
      this.select_box_open[0] = val;
      ;
    } else {
      this.select_box_open = []
    }
  }
}
