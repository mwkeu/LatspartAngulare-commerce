import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;
  private users: { email: string; password: string }[] = [];

  constructor() {
    const storedUsers = localStorage.getItem('users');
    this.users = storedUsers ? JSON.parse(storedUsers) : [];
  }

  register(email: string, password: string) {
    this.users.push({ email, password });
    localStorage.setItem('users', JSON.stringify(this.users));
    this.isAuthenticated = true;
    localStorage.setItem('isAuthenticated', 'true');
  }

  login(email: string, password: string): boolean {
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const userExists = storedUsers.some(
      (user: any) => user.email === email && user.password === password
    );

    if (userExists) {
      this.isAuthenticated = true;
      localStorage.setItem('isAuthenticated', 'true');
      return true;
    }

    return false;
  }

  logout() {
    this.isAuthenticated = false;
    localStorage.removeItem('isAuthenticated');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('isAuthenticated') === 'true';
  }

  resetAuth(): void {
    this.isAuthenticated = false;
    localStorage.removeItem('isAuthenticated');
  }
}
