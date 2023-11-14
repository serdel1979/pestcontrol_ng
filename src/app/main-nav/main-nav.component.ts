import { Component, OnInit, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit{

//<mat-icon>perm_contact_calendar</mat-icon>

//<mat-icon>event_note</mat-icon>

public MENU: any[] = [
  { path: '/clients/allclients', title: 'Clientes', icon: 'supervisor_account'},
  { path: '/contacts/allcontacts', title: 'Contactos', icon: 'contacts'},
  { path: '/tasks/schedule', title: 'Tareas', icon: 'work'},
  { path: '', title: 'Novedades', icon: 'fiber_new'}
];



  private breakpointObserver = inject(BreakpointObserver);
  private authService = inject(UserService);
  private router = inject(Router);




  public logued: boolean = false;



  ngOnInit(): void {
    this.authService.subsLogued
    .subscribe((logued)=>{
      this.logued = logued;
    })

    this.logued = this.authService.isLogued();
  }


  logout(){
    this.authService.logout();
    this.router.navigateByUrl('/auth/login');
  }

  goTo(path: string){
    this.router.navigateByUrl(path);
  }



  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
}
