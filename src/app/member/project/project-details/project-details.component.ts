import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProjectService} from '../../../shared/services/components/project.service';
import {Project} from '../../../shared/models/project';
import {Subscription} from 'rxjs';
import {Response} from '../../../shared/models/response';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit, OnDestroy {

  public projects: Project[];
  private subscription: Subscription = new Subscription();
  displayedColumns: string[] = ['projectCode', 'projectName', 'startEndDate', 'manager', 'taskStatus', 'status', 'actions'];


  constructor(private projectService: ProjectService) {
  }

  ngOnInit(): void {
    this.readProjectDetails();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  readProjectDetails(): void {

    const request = this.projectService.readWithDetails().subscribe((response: Response<any>) => {
      if (response.success) {
        this.projects = response.data;
      }
    });
    this.subscription.add(request);
  }

  onComplete(projectCode: string): void {
    if (!projectCode) {
      return;
    }

    const request = this.projectService.complete(projectCode).subscribe(response => {
      if (response.success) {
        this.readProjectDetails();
      }
    });

    this.subscription.add(request);
  }

  disableCompleteButton(project: Project): boolean {

    if (project.projectStatus.toString() === 'COMPLETE') {
      return true;
    }

    return project.unfinishedTaskCounts > 0;

  }
}
