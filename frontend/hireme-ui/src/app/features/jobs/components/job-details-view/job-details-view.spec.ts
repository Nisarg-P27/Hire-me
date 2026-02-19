import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobDetailsView } from './job-details-view';

describe('JobDetailsView', () => {
  let component: JobDetailsView;
  let fixture: ComponentFixture<JobDetailsView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobDetailsView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobDetailsView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
