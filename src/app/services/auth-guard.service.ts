import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { JWTTokenService } from './jwt.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: "root"
})

export class AuthGuardService implements CanActivate {

  constructor(public jwtService: JWTTokenService, public router: Router, public localSotarageService: LocalStorageService ) {}
  canActivate(): boolean {
    const token = this.localSotarageService.get("SESSION_TOKEN");

    if(!token){
      this.router.navigate(['login']);
      return false;
    }
    
    this.jwtService.setToken(token);

    if (this.jwtService.isTokenExpired()) {
      this.router.navigate(['login']);
      return false;
    }

    return true;
  }
}