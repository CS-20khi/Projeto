import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
providedIn: 'root'
})
export class AuthService {
private loggedIn = new BehaviorSubject<boolean>(false);

constructor() {
const userLoggedIn = localStorage.getItem('isLoggedIn');
if (userLoggedIn === 'true') {
this.loggedIn.next(true);
}
}

login(email: string, password: string): boolean {
if (email === 'nome@gmail.com' && password === '123456') {
this.loggedIn.next(true);
localStorage.setItem('isLoggedIn', 'true');
localStorage.setItem('usuarioLogado', email); 
return true;
} else {
this.loggedIn.next(false);
localStorage.removeItem('isLoggedIn');
localStorage.removeItem('usuarioLogado');
return false;
}
}

logout(): void {
this.loggedIn.next(false);
localStorage.removeItem('isLoggedIn');
localStorage.removeItem('usuarioLogado'); 
}

isLoggedIn(): boolean {
return this.loggedIn.getValue();
}

getLoggedInStatus(): BehaviorSubject<boolean> {
return this.loggedIn;
}

getUsuario(): string | null {
return localStorage.getItem('usuarioLogado');
}
}
