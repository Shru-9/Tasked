import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/global/common.service';
import { JsonService } from 'src/app/global/json.service';

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
  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    autoplay: true,
  };
  UserDetails: any;
  slides = [
    { img: 'assets/images/loginimagethree.jpg' },
    { img: 'assets/images/loginimageone.webp' },
    { img: 'assets/images/loginImageTwo.jpg' }
  ];
  constructor(private service: JsonService,
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private common: CommonService
  ) {

    // this.videourl = '/src/assets/images/login-video.mp4'
    this.activatedRoute.queryParams.subscribe((filter) => {
      this.urlParam = filter;
    });
  }

  ngOnInit(): void {
    
    localStorage.removeItem("UserDetails");
    this.form = this.formBuilder.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required]],
    });
    this.getUsers()
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  getUsers() {
    this.service.getallUsers().subscribe(
      (res: any[]) => {
        this.UserDetails = res
      })
  }
  submit() {
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
    this.UserDetails.forEach(element => {
      if (this.form.value.username && this.form.value.password && element.email && element.password) {
        if (this.form.value.username == element.email && this.form.value.password == element.password) {
          this.router.navigate(['/task']);           
          localStorage.setItem("UserDetails", JSON.stringify(element));
        }
      }else{
        this.loader = false
        this.common.snackbar1("Username or Password incorrect.","success")

      }

    });
  }
}
