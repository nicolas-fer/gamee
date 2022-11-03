import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;

  constructor(private userService: UserService) {
    this.formGroup = new FormGroup({
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
    });
  }

  ngOnInit(): void { }

  login(): void {
    if (this.formGroup.valid) {
      this.userService.login(this.formGroup.value).subscribe(result => {
        if (result.success) {
          alert(result.data.token);
        }
      }, error => {
        if (!error.error.success) {
          alert(error.error.message);
        }
      });
    }
  }
}
