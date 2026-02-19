import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobSearchPanel } from './job-search-panel';

describe('JobSearchPanel', () => {
  let component: JobSearchPanel;
  let fixture: ComponentFixture<JobSearchPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobSearchPanel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobSearchPanel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
