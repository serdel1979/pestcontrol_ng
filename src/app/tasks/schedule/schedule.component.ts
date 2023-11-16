import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {


  public squedules: any[] = [];
  public load: boolean = false;
  pageSize: number = 5;
  currentPage: number = 1;
  pageSizeOptions: number[] = [5, 10, 25];

  public displayedColumns: string[] = ['client', 'subJob', 'description','dateInit','dateEnd'];
  public dataSource = new MatTableDataSource<any>(); // Inicializa el dataSource vacío

  //@ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatPaginator) set paginator(paginator: MatPaginator) {
          this.dataSource.paginator = paginator;
  }


  constructor(private router: Router,
    private tasksService: TasksService,
    private dialog: MatDialog
    ) {
    this.load = true;
    this.tasksService.getSquedule().subscribe(resp => {
      this.squedules = resp;
      this.dataSource = new MatTableDataSource<any[]>(this.squedules); // Actualiza el dataSource con los datos
      this.dataSource.paginator = this.paginator; // Configura el paginador
      this.load = false;
    },
      () => {
        this.load = false;
      });
  }

  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }




  addSchedule(){
    this.router.navigateByUrl('tasks/addSchedule');
  }


  back() {
    window.history.back();
  }

}
