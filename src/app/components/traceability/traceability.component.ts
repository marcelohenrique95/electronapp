import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-traceability',
  templateUrl: './traceability.component.html',
  styleUrls: ['./traceability.component.scss']
})
export class TraceabilityComponent implements OnInit {

  resultSearch: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  search(){
    this.resultSearch = true;
  }

  exportFile(){

  }
}
