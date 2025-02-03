import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private authService: AuthService) {}

  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() registerSuccessEvent = new EventEmitter<void>();

  register(email: string, password: string) {
    this.authService.register(email, password);
    this.registerSuccessEvent.emit();
    this.closeModalEvent.emit();
  }

  closeRegisterModal() {
    this.closeModalEvent.emit();
  }
}
