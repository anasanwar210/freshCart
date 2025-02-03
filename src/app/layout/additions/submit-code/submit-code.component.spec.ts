import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitCodeComponent } from './submit-code.component';

describe('SubmitCodeComponent', () => {
  let component: SubmitCodeComponent;
  let fixture: ComponentFixture<SubmitCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmitCodeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmitCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
