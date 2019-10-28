import { Component, OnInit, Input } from '@angular/core';
import { QuotationDTO } from 'src/app/api/models';

@Component({
  selector: 'app-quoted-data',
  templateUrl: './quoted-data.component.html',
  styleUrls: ['./quoted-data.component.scss'],
})
export class QuotedDataComponent implements OnInit {
  @Input('quotation')
  q: QuotationDTO;
  constructor() { }

  ngOnInit() {}

}
