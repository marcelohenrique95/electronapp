import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-receive-file',
  templateUrl: './receive-file.component.html',
  styleUrls: ['./receive-file.component.scss']
})
export class ReceiveFileComponent implements OnInit {

  public paginaAtual = 1;
  erro: any;
  clientGroup: FormGroup;
  selectedAll: any;
  names: any;
  title = 'Checkbox';

  constructor(private router: Router, private fb: FormBuilder) {
    this.title = "Select all/Deselect all checkbox - Angular 2";
    this.names = [
      { name: 'Prashobh', selected: false },
      { name: 'Abraham', selected: false },
      { name: 'Anil', selected: false },
      { name: 'Sam', selected: false },
      { name: 'Natasha', selected: false },
      { name: 'Marry', selected: false },
      { name: 'Zian', selected: false },
      { name: 'karan', selected: false },
    ]
  }
  selectAll() {
    this.selectedAll = !this.selectedAll;

    for (var i = 0; i < this.names.length; i++) {
      this.names[i].selected = this.selectedAll;
    }
  }

  checkIfAllSelected() {
    var totalSelected = 0;
    for (var i = 0; i < this.names.length; i++) {
      if (this.names[i].selected) totalSelected++;
    }
    this.selectedAll = totalSelected === this.names.length;

    return true;
  }

  ngOnInit(): void {
  }
}
