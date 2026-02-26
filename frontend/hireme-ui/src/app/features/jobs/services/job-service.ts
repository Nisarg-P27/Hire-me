import { Injectable } from '@angular/core';
import { Job } from '../models/job';
import { delay } from 'rxjs/internal/operators/delay';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private mockData: Job[] = [
    {
      id: '1',
      title: 'Backend Developer',
      company: 'Google',
      location: 'Bangalore',
      description: `We are looking for a skilled Backend Developer to join our growing engineering team at Google. You will be responsible for designing, building, and maintaining efficient, reusable, and reliable server-side applications using Java and Spring Boot. You will collaborate closely with frontend engineers, DevOps, and product managers to deliver scalable solutions that serve millions of users worldwide.\n\nIn this role, you will be expected to write clean, well-tested code and participate in code reviews. You should have a strong understanding of RESTful API design, microservices architecture, and cloud infrastructure. Experience with Google Cloud Platform (GCP) is a strong plus. This is a great opportunity to work on systems that operate at massive scale and have real-world impact.`,
      recruiterId: '123',
    },
    {
      id: '2',
      title: 'Frontend Engineer',
      company: 'Amazon',
      location: 'Hyderabad',
      description: `Amazon is seeking a passionate Frontend Engineer to build modern, responsive, and accessible user interfaces for our e-commerce and cloud platforms. You will work with Angular and React to develop component-based UI systems that are fast, reliable, and delightful to use. You will collaborate with UX designers and backend engineers to bring product ideas to life.\n\nThe ideal candidate has a deep understanding of HTML, CSS, TypeScript, and state management patterns. You should be comfortable working in an agile environment and have experience with performance optimization techniques such as lazy loading, code splitting, and caching strategies. We value engineers who care about the user experience as much as they care about clean code.`,
      recruiterId: '13',
    },
    {
      id: '3',
      title: 'Full Stack Developer',
      company: 'Microsoft',
      location: 'Pune',
      description: `Microsoft is hiring a Full Stack Developer to work on our enterprise cloud applications and developer tooling products. You will own features end-to-end — from designing REST APIs in Spring Boot to building Angular-based dashboards that our customers rely on daily. You will be part of a cross-functional team that ships fast and iterates based on real user feedback.\n\nYou should have solid experience with both frontend and backend technologies, a good grasp of database design (SQL and NoSQL), and familiarity with CI/CD pipelines. Experience with Azure cloud services is a major advantage. We are looking for engineers who are proactive, curious, and not afraid to take ownership of complex problems across the stack.`,
      recruiterId: '123',
    },
    {
      id: '4',
      title: 'DevOps Engineer',
      company: 'Google',
      location: 'Chennai',
      description: `Join Google's infrastructure team as a DevOps Engineer and help us build and maintain the pipelines that power our global services. You will be responsible for automating deployments, managing Kubernetes clusters, and ensuring the reliability and scalability of our systems. You will work closely with development teams to embed DevOps best practices into every stage of the software lifecycle.\n\nThe ideal candidate has hands-on experience with Docker, Kubernetes, Terraform, and CI/CD tools like Jenkins or GitHub Actions. You should be comfortable with Linux systems administration and have a strong understanding of networking concepts. Experience with Google Cloud Platform (GCP) and Site Reliability Engineering (SRE) principles is highly desirable.`,
      recruiterId: '13',
    },
    {
      id: '5',
      title: 'Android Developer',
      company: 'Flipkart',
      location: 'Bangalore',
      description: `Flipkart is looking for an experienced Android Developer to join our mobile engineering team and help build the next generation of our shopping app, used by over 300 million customers across India. You will work on feature development, performance improvements, and maintaining a high-quality codebase using Kotlin and Jetpack Compose. You will collaborate with product managers and designers to create seamless mobile experiences.\n\nYou should have a strong understanding of Android architecture components, RESTful API integration, and mobile performance optimization. Familiarity with A/B testing, crash analytics tools like Firebase, and app store deployment processes is expected. We value developers who are passionate about mobile UX and constantly look for ways to make the app faster and more intuitive.`,
      recruiterId: '13',
    },
    {
      id: '6',
      title: 'Data Engineer',
      company: 'Amazon',
      location: 'Bangalore',
      description: `Amazon's data platform team is hiring a Data Engineer to design and build scalable data pipelines that power our analytics, machine learning, and business intelligence systems. You will work with large datasets, build ETL workflows using Apache Spark and Kafka, and ensure data quality and availability across the organization. Your work will directly support data-driven decision making at every level of the company.\n\nThe ideal candidate has experience with Python or Scala, SQL, and big data technologies. Familiarity with AWS services such as S3, Glue, Redshift, and EMR is strongly preferred. You should be comfortable working in a fast-paced environment where data volumes are massive and accuracy is critical. Strong problem-solving skills and attention to detail are a must.`,
      recruiterId: '1',
    },
    {
      id: '7',
      title: 'UI/UX Designer',
      company: 'Infosys',
      location: 'Mumbai',
      description: `Infosys is seeking a creative and user-focused UI/UX Designer to join our digital experience team. You will be responsible for designing intuitive interfaces for enterprise web and mobile applications, from wireframes and prototypes to final high-fidelity designs. You will work closely with product managers, developers, and clients to understand user needs and translate them into elegant design solutions.\n\nYou should be proficient in Figma or Adobe XD and have a strong portfolio showcasing your design process and outcomes. Experience with design systems, accessibility standards (WCAG), and usability testing is highly valued. We are looking for someone who can think both creatively and analytically, and who is passionate about creating designs that are not just beautiful but also functional and accessible.`,
      recruiterId: '123',
    },
    {
      id: '8',
      title: 'Java Developer',
      company: 'Infosys',
      location: 'Hyderabad',
      description: `Infosys is looking for a Java Developer to work on large-scale enterprise applications for our global clients across banking, insurance, and retail sectors. You will develop and maintain backend services using Core Java, Spring Framework, and Hibernate, ensuring high performance, reliability, and security. You will participate in the full software development lifecycle — from requirement gathering and system design to deployment and support.\n\nThe ideal candidate has 2+ years of Java development experience, strong knowledge of object-oriented design principles, and familiarity with microservices and RESTful APIs. Experience with Oracle or PostgreSQL databases and tools like Maven and Git is expected. We value developers who write clean, maintainable code and take pride in delivering quality software on time.`,
      recruiterId: '13',
    },
    {
      id: '9',
      title: 'Cloud Architect',
      company: 'Microsoft',
      location: 'Noida',
      description: `Microsoft is looking for a Cloud Architect to lead the design and implementation of cloud solutions for our enterprise customers on Azure. You will work directly with clients to understand their business and technical requirements, then architect robust, secure, and cost-effective cloud infrastructures. You will mentor junior engineers, conduct architecture reviews, and stay current with the latest Azure services and cloud trends.\n\nYou should have extensive experience with cloud architecture patterns, security best practices, and hybrid cloud solutions. Azure certifications such as Azure Solutions Architect Expert are strongly preferred. Strong communication skills are essential as you will regularly present technical solutions to both technical teams and non-technical stakeholders. This is a senior role with significant influence over technology direction.`,
      recruiterId: '123',
    },
    {
      id: '10',
      title: 'QA Automation Engineer',
      company: 'Flipkart',
      location: 'Pune',
      description: `Flipkart's quality engineering team is hiring a QA Automation Engineer to ensure the reliability and performance of our e-commerce platform. You will design, build, and maintain automated test suites using tools like Selenium, Cypress, and Appium, covering web, mobile, and API layers. You will work closely with developers and product managers to define test strategies and integrate automated tests into our CI/CD pipelines.\n\nThe ideal candidate has strong programming skills in Java or Python, experience with testing frameworks, and a solid understanding of software QA methodologies. Experience with performance testing tools like JMeter or Gatling is a plus. We are looking for someone who is detail-oriented, analytical, and passionate about quality — someone who believes that great QA is just as important as great development.`,
      recruiterId: '12',
    },
  ];
  private readonly STORAGE_KEY = 'hireme_jobs';

  private readonly jobsSubject = new BehaviorSubject<Job[]>(
    this.loadJobsFromStorage() || this.mockData,
  );
  readonly jobs$ = this.jobsSubject.asObservable();

  constructor() {}

  /**
   * Returns all available jobs
   */
  getJobs(): Observable<Job[]> {
    return this.jobs$.pipe(
      delay(1200),
      tap(() => console.log('Jobs emitted')),
    );
  }
  getJobById(id: string): Observable<Job | undefined> {
    return this.jobs$.pipe(
      map((jobs) => jobs.find((job) => job.id === id)),
      delay(1200),
    );
  }
  private loadJobsFromStorage(): Job[] {
    const storedData = localStorage.getItem(this.STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : this.mockData;
  }

  private saveJobsToStorage(jobs: Job[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(jobs));
  }
}
