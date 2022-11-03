import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UserService, LocalStorageService]
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;

  constructor(private _userService: UserService, 
              private _router: Router,
              private _localSotarageService: LocalStorageService) {
    this.formGroup = new FormGroup({
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
    });
  }

  ngOnInit(): void { 
    let sessionToken = this._localSotarageService.get("SESSION_TOKEN");
    if(sessionToken){
      this._router.navigate(['']);
    }
  }

  login(): void {
    if (this.formGroup.valid) {
      this._userService.login(this.formGroup.value).subscribe(result => {
        if (result.success) {
          this._localSotarageService.set("SESSION_TOKEN", result.data.token);
          this._router.navigate(['']);
        }
      }, error => {
        if (!error.error.success) {
          alert(error.error.message);
        }
      });
    }
  }
}
