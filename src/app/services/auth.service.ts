import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {}

  login(email: string, password: string) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, password).then(
        (userData) => resolve(userData),
        (error) => reject(error)
      );
    });
  }

  register(email: string, password: string) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(
        (userData) => resolve(userData),
        (error) => reject(error)
      );
    });
  }

  getAuth() {
    return this.afAuth.authState.map((auth) => auth);
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
