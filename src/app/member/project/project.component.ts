import {Component, OnDestroy, OnInit} from '@angular/core';
import {Project} from '../../shared/models/project';
import {Subscription} from 'rxjs';
import {ProjectService} from '../../shared/services/components/project.service';
import {Response} from '../../shared/models/response';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit, OnDestroy {

  public projects: Project[];
  displayedColumns: string[] = ['projectCode', 'projectName', 'startEndDate', 'manager', 'status', 'actions'];

  private subscription: Subscription = new Subscription();

  constructor(private projectService: ProjectService) {
  }

  ngOnInit(): void {
    this.readProjects();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  readProjects(): void {
    const request = this.projectService.read().subscribe((response: Response<any>) => {
      if (response.success) {
        this.projects = response.data;
      }
    });

    this.subscription.add(request);
  }

  onDelete(code: string): void {

    if (!code) {
      return;
    }

    this.projectService.delete(code).subscribe(response => {
      if (response.success) {
        this.readProjects();
      }
    });
  }


  onComplete(projectCode: string): void {
    if (!projectCode) {
      return;
    }

    const request = this.projectService.complete(projectCode).subscribe(response => {
      if (response.success) {
        this.readProjects();
      }
    });

    this.subscription.add(request);
  }
}
