import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterApplicationsDialog } from './recruiter-applications-dialog';

describe('RecruiterApplicationsDialog', () => {
  let component: RecruiterApplicationsDialog;
  let fixture: ComponentFixture<RecruiterApplicationsDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecruiterApplicationsDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecruiterApplicationsDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
