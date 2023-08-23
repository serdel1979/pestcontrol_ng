import { Component, OnInit, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { UserService } from '../services/user.service';




@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit{


  
public MENU: any[] = [
  { path: '/pages/page1', title: 'Solicitudes'},
  { path: '/pages/page2', title: 'Historial'},
  { path: '/pages/page3', title: 'Usuarios'},
];



  private breakpointObserver = inject(BreakpointObserver);
  private authService = inject(UserService);




  public logued: boolean = false;



  ngOnInit(): void {
    this.authService.subsLogued
    .subscribe((logued)=>{
      console.log('logueado');
      this.logued = logued;
    })
  }



  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
}
