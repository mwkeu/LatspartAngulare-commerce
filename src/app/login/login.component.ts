import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private authService: AuthService) {}

  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() openRegisterEvent = new EventEmitter<void>();
  @Output() loginSuccessEvent = new EventEmitter<void>();

  login(email: string, password: string) {       
    const success = this.authService.login(email, password);
    if (success) {
      this.loginSuccessEvent.emit();
      this.closeModalEvent.emit();
    } else {
      alert('Hatalı email veya şifre!');
    }
  }

  closeLoginModal() {
    this.closeModalEvent.emit();
  }

  openRegister() {
    this.openRegisterEvent.emit();
  }
}
