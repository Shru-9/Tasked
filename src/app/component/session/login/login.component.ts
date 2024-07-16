import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from '../../dialog/dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loader: boolean = false;
  form: FormGroup;
  submittedForm = false;
  hide = true;
  urlParam: any = {};
  branding: any;
  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    autoplay: true,
  };
  slides = [
    { img: 'assets/images/myTask.png' },
    { img: 'assets/images/task.png' },
    // { img: 'assets/images/slide3.jpg' }
  ];
  videourl : string
    constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog
  ) {
    
    this.videourl = '/src/assets/images/login-video.mp4'
    this.activatedRoute.queryParams.subscribe((filter) => {
      this.urlParam = filter;
    });
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required]],
    });
  }
  
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  submit(){
    this.loader = true;
    this.submittedForm = true;
    if (this.form.invalid) {
      this.loader = false;
      return;
    }
    if (
      this.form.value.password.trim().length <= 0 ||
      this.form.value.username.trim().length <= 0
    ) {
      this.loader = false;
      return;
    }
    if (this.form.value.username == "" || this.form.value.password == "") {
      this.loader = false;
      return;
    }
    this.router.navigate(['/task']);

  }
newUsers(){
  const dialogRef = this.dialog.open(DialogComponent, {
    data: {
      type: 'addUsers',

    },
    
    // width: "25vw",
    height: "400px",
    // minHeight: "100px",
    // maxHeight: "70vh",
    width: "600px",
    disableClose: true,
  });
  dialogRef.afterClosed().subscribe((status) => {

  });

}

}