import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/shared/model/task.model';
import { TaskService } from 'src/app/shared/service/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  toDoTasks: Task[] | undefined;
  doneTasks: Task[] | undefined;
  loadedToDoTasks: boolean = false;
  loadedDoneTasks: boolean = false;

  constructor(public service: TaskService) { }

  ngOnInit(): void {
    this.getToDoTasks();
    this.getDoneTasks();
  }

  getToDoTasks() {
    this.service.getTasksWithStatus('TODO').subscribe(
      data => {
        this.toDoTasks = data.content;
        console.log(data);
        this.loadedToDoTasks = true;
      }
    )
  }

  getDoneTasks() {
    this.service.getTasksWithStatus('DONE').subscribe(
      data => {
        this.doneTasks = data.content;
        console.log(data);
        this.loadedDoneTasks = true;
      }
    )
  }

  closeTask(task: Task) {
    task.status = 'DONE';
    this.service.updateTask(task, task.id).subscribe(
      data => {
        console.log(data);
        this.getDoneTasks();
        this.getToDoTasks();
      }
    )
  }

  removeTask(task: Task) {
    this.service.deleteTask(task.id).subscribe(data => {
      console.log(data)
      this.getDoneTasks();
      this.getToDoTasks();
    });
  }

}
