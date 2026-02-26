import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateProfileForm } from './candidate-profile-form';

describe('CandidateProfileForm', () => {
  let component: CandidateProfileForm;
  let fixture: ComponentFixture<CandidateProfileForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandidateProfileForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidateProfileForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
