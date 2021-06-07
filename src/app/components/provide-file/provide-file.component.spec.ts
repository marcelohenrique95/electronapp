import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvideFileComponent } from './provide-file.component';

describe('ProvideFileComponent', () => {
  let component: ProvideFileComponent;
  let fixture: ComponentFixture<ProvideFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvideFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvideFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
