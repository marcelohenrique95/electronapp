import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiveFileComponent } from './receive-file.component';

describe('ReceiveFileComponent', () => {
  let component: ReceiveFileComponent;
  let fixture: ComponentFixture<ReceiveFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiveFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiveFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
