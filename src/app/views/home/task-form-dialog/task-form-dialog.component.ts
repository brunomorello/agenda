import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TaskService } from 'src/app/shared/service/task.service';

@Component({
  selector: 'app-task-form-dialog',
  templateUrl: './task-form-dialog.component.html',
  styleUrls: ['./task-form-dialog.component.css']
})
export class TaskFormDialogComponent implements OnInit {

  public taskForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: TaskService,
    public dialogRef: MatDialogRef<TaskFormDialogComponent>
  ) { }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      shortDescription: ['', [Validators.required]],
      description: ['', [Validators.required]],
      dueDate: ['', [Validators.required]],
      dueDateTime: ['', [Validators.required, Validators.pattern('([0-1][0-9]):([0-6][0-9])')]]
    })
  }

  addTask(): void {
    let dueDateAux = new Date(this.taskForm.value.dueDate);
    let dueDateHourAux = this.taskForm.value.dueDateTime.split(':')[0];
    let dueDateMinutesAux = this.taskForm.value.dueDateTime.split(':')[1];
    dueDateAux.setHours(dueDateHourAux);
    dueDateAux.setMinutes(dueDateMinutesAux);

    console.log(this.taskForm.value);
    
    this.taskForm.value.dueDate = dueDateAux;
    this.service.postTask(this.taskForm.value)
      .subscribe(result => {
        console.log(result);
        this.closeAndReset();
        window.location.reload();
      });
  }

  cancel(): void {
    this.closeAndReset();
  }

  private closeAndReset(): void {
    this.dialogRef.close();
    this.taskForm.reset();
  }

}
