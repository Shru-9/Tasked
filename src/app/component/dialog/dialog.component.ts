import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { JsonService } from 'src/app/global/json.service';
import { CommonService } from 'src/app/global/common.service';
export function checknull(controlName) {
  return (formGroup: FormGroup) => {
    const checkspace = formGroup.controls[controlName];
    if (checkspace !== undefined) {
      if (checkspace.errors) {
        return;
      }
      if (checkspace.value && checkspace.value.trim("").length === 0) {
        checkspace.setErrors({ checknull: true });
      } else {
        checkspace.setErrors(null);
      }
    }
    return null;
  };
}
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  loader: boolean = false;
  skillId: any;
  userDetails: any;
  regex: any;
  masters: any;
  form: FormGroup;
  submittedForm = false;
  requestObj: any;
  editingTaskId: number | null = null;
  
  MAXCHARACTER = 1024;
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service :JsonService,
    private formBuilder: FormBuilder,
    private common: CommonService) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group(
      {
        Assignee: ["", [Validators.required, Validators.maxLength(100)]],
        //Assignee: ['', [Validators.required]],
        Description: ["", [Validators.nullValidator]],
        Request: ["", [Validators.required]],
        Priority: ["", [Validators.required]],
        Subject: ["", [Validators.required]],
        Status:[false, [Validators.nullValidator]],
        UserId:["1", [Validators.nullValidator]]
      }, {
        validator: [checknull("Assignee"),
        checknull("Subject"), checknull("Request"), checknull("Description")]
    }
    );
    if (this.data.data) {
      this.form.patchValue(this.data.data);
      this.editingTaskId = this.data.data.id
    }
    console.log(this.data.data)
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  
  numericOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (
      charCode === 101 || charCode === 69 || charCode === 45 || charCode === 43 ||
      charCode === 33 || charCode === 35 || charCode === 47 || charCode === 36 ||
      charCode === 37 || charCode === 38 || charCode === 40 ||
      charCode === 41 || charCode === 42 || charCode === 46 ||
      (charCode > 47 && (charCode < 48 || charCode > 57))
    ) {
      return false;
    } else if (event.target.value.length >= 20) {
      return false;
    }
    return true;
  }
  closeDialog(status: any): void {
    this.dialogRef.close(status);
  }

  saveTask(): void {
    if (this.form.valid) {
      const taskData = this.form.value;
      if (this.editingTaskId !== null) {
        this.service.updateTask(this.editingTaskId, taskData).subscribe(() => {
          this.editingTaskId = null;
          this.common.snackbar1("Data Updated Sucessfully","success")
          this.closeDialog(true);
        });
      } else {
        this.service.createTask(taskData).subscribe(() => {
          this.common.snackbar1("Data Added Sucessfully","success")
          this.closeDialog(true);
        });
      }
    }
  }

}
