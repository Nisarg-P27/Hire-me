import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateProfilePage } from './candidate-profile-page';

describe('CandidateProfilePage', () => {
  let component: CandidateProfilePage;
  let fixture: ComponentFixture<CandidateProfilePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandidateProfilePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidateProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
