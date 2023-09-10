import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-all-tasks',
  templateUrl: './all-tasks.component.html',
  styleUrls: ['./all-tasks.component.css']
})
export class AllTasksComponent implements AfterViewInit, OnInit {
  
  public displayedColumns: string[] = ['description', 'type'];
  public tasks : any[] = [];
  public tasksFilter : any[] = [];
  public filter!:string;

  public loading: boolean = false;

  public dataSource = new MatTableDataSource<any>(this.tasks);
  


  constructor(private router: Router, private tasksService: TasksService) { }



  ngOnInit(): void {
    this.loading = true;
    this.tasksService.getTasks()
      .subscribe(resp => {
        this.tasks = resp;
        this.tasksFilter = resp;
        this.dataSource.data = this.tasksFilter;
        this.loading = false;
      },
        err => {
          this.loading = false;
        })
  }
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }

  @ViewChild(MatPaginator) set paginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }




  applyFilter() {
    if (this.filter.trim() === '') {
      this.tasksFilter = this.tasks;
    } else {
      const filterValue = this.filter.toLowerCase();
      this.tasksFilter = this.tasks.filter((task: any) => {
        // Comprueba si el filtro coincide con el nombre, surname o email
        return (
          task.description.toLowerCase().includes(filterValue)
        );
      });
    }
    this.dataSource.data = this.tasksFilter;
  }






  back() {
    window.history.back();
  }




}
