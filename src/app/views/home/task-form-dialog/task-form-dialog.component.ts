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
      description: ['', [Validators.required]]
    })
  }

  addTask(): void {
    this.service.postTask(this.taskForm.value)
      .subscribe(result => {
        console.log(result);
        this.closeAndReset();
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
