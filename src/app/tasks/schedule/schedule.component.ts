import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DialogCancelComponent } from 'src/app/alerts/dialog-cancel/dialog-cancel.component';
import { AlertService } from 'src/app/services/alert.service';
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

  public displayedColumns: string[] = ['client','branch', 'subJob', 'description','dateInit','dateEnd','opciones'];
  public dataSource = new MatTableDataSource<any>(); // Inicializa el dataSource vacío

  //@ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatPaginator) set paginator(paginator: MatPaginator) {
          this.dataSource.paginator = paginator;
  }


  constructor(private router: Router,
    private tasksService: TasksService,
    private dialog: MatDialog,
    private alertDialogService: AlertService,
    private _snackBar: MatSnackBar
    ) {}

  
  ngOnInit(): void {
    this.loadData();
  }

  isDateGreaterThanToday(date: string): string {
    const dateEnd = new Date(date);
    const today = new Date();
    dateEnd.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    const isGreaterThanToday = dateEnd > today;    
    return isGreaterThanToday ? 'green' : 'black';
  }

  loadData(){
    this.load = true;
    this.tasksService.getSquedules().subscribe(resp => {
      this.squedules = resp;
      this.dataSource = new MatTableDataSource<any[]>(this.squedules); // Actualiza el dataSource con los datos
      this.dataSource.paginator = this.paginator; // Configura el paginador
      this.load = false;
    },
      () => {
        this.load = false;
      });
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }



  editSchedule(id:number){
    this.router.navigateByUrl(`tasks/schedule/${id}`);
  }


  addSchedule(){
    this.router.navigateByUrl('tasks/addSchedule');
  }

  deletSchedule(idSubJob:number,idBranch:number){
    return new Promise<boolean>((resolve) => {
      const dialogRef = this.dialog.open(DialogCancelComponent, {
        data: { message: '¿Está seguro de eliminar el registro?' },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.load = true;
          this.tasksService.deletSquedule(idSubJob,idBranch)
          .subscribe(
            resp=>{
                this._snackBar.open("Registro eliminado", "OK");
              
              this.load = false;
              this.loadData();
            },
            (err)=>{
              this.load = false;
              this.alertDialogService.openAlertDialog('No se pudo eliminar el registro');
            }
          )
        }
      });
    });
  }


  back() {
    window.history.back();
  }

}
