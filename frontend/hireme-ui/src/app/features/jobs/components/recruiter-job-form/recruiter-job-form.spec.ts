import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterJobForm } from './recruiter-job-form';

describe('RecruiterJobForm', () => {
  let component: RecruiterJobForm;
  let fixture: ComponentFixture<RecruiterJobForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecruiterJobForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecruiterJobForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
