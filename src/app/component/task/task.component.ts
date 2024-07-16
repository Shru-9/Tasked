import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatDrawer } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';
import { JsonService } from 'src/app/global/json.service';
import { DialogComponent } from '../dialog/dialog.component';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/global/common.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  status;
  loader = false;
  option1: any;
  @ViewChild("panel0") public panel0: MatDrawer;
  @Input() isDialog: boolean = false;
  inner_content_height = getComputedStyle(document.body).getPropertyValue(
    "--inner_content"
  );
  content_height = getComputedStyle(document.body).getPropertyValue(
    "--content"
  );
  header_height = getComputedStyle(document.body).getPropertyValue("--header");
  // colorPalette = this.common.colorArray.concat(this.common.colorArray);
  path: any;
  userDetails: any;
  subscription: Subscription[] = [];
  labelName: any;
  page: number = 1;
  currentpage: number = 1;
  itemsPerPage: number = 10;
  paginationArray: any = [];
  finalField: any[] = [];
  selctedField: any[] = [];
  unSelctedField: any[] = [];
  search: any;
  filter: any;
  crossIcon: boolean = false;
  searchValue: string;
  Number: string;
  form: FormGroup;
  tabKey: any = [];
  tabValue: any = [];
  requestObj: any;
  userId: any = '';
  chartData: any[];

  constructor(private service: JsonService,
    public dialog: MatDialog,
    private common: CommonService,
    private router: Router,) {

  }


  ngOnInit(): void {
    this.userDetails = JSON.parse(localStorage.getItem("UserDetails"))
    if (this.userDetails.id) this.userId = this.userDetails.id
    this.getAllTasks()
  }
  getAllTasks() {

    this.service.getTasksByUserId(this.userId).subscribe(
      (res: any[]) => {
        this.getpiechart(res)
        this.tabKey = []
        this.tabValue = []
        this.tabValue = res
        for (var key in this.tabValue[0]) {
          if (this.tabValue[0].hasOwnProperty(key)) {
            this.tabKey.push(key);
          }
        }
        this.unSelctedField = [...this.tabKey];
        var unSelctedField = [];
        let idAdded = false;
        for (let i = 0; i < this.unSelctedField.length; i++) {
          if (this.unSelctedField[i] === 'id') {
            idAdded = true;
          } else {
            unSelctedField.push({
              value: this.unSelctedField[i],
              className: "tabCol",
            });
          }
        }
        this.finalField = [];
        if (idAdded) {
          this.finalField.push({
            value: 'id',
            className: "tabCol",
          });
        }
        this.finalField = [...this.finalField, ...unSelctedField];
        // this.getpiechart(res)
      },
      (error) => {
        console.error('Error fetching tasks:', error);
      }
    );
  }

  deleteTask(id: number): void {
    this.service.deleteTask(id).subscribe(() => {
      this.getAllTasks();      
      this.common.snackbar1("Data Deleted Sucessfully","warning")
    });
  }

  pageChange(currentpage) {
    this.currentpage = currentpage;
  }
  setSearch(event) {
    event.length === 0 ? (this.crossIcon = false) : (this.crossIcon = true);
    this.search = event;
  }
  setItemsPerPage(event) {
    this.itemsPerPage = event
  }
  clearSearch() {
    this.searchValue = "";
    this.crossIcon = false;
  }

  openAlertDialog(data) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        type: 'AddEditTask',
        data: data
      },
      minHeight: "60px",
      maxHeight: "70vh",
      width: "600px",
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((status) => {
      this.getAllTasks()
    });
  }

  getpiechart(data) {
    this.chartData = []
    const statusCounts = data.reduce((counts, task) => {
      if (task.Status) {
        counts.completed += 1;
      } else {
        counts.pending += 1;
      }
      return counts;
    }, { completed: 0, pending: 0 });

    // Format the data for the chart
    this.chartData = [
      { value: statusCounts.completed, name: "Completed" },
      { value: statusCounts.pending, name: "Pending" }
    ];
    this.option1 = {
      title: {
        show: true,
        text: "100",
        subtext: "total",
        left: "center",
        top: "30%",
        textStyle: {
          fontSize: 20,
        },
        itemGap: 0,
        subtextStyle: {
          fontSize: +this.content_height,
        },
      },
      tooltip: {
        trigger: "item",
        formatter: "{b}: {c}",
        textStyle: {
          fontSize: +this.inner_content_height,
        },
      },
      legend: {
        bottom: "1%",
        left: "center",
        icon: "circle",
        orient: "horizontal",
        itemGap: 6,
        itemWidth: 6,
        itemHeight: 6,
        width: "100%",
        textStyle: {
          fontSize: 7,
          fontWeight: "normal",
          color: "#707070",
        },
      },
      series: [
        {
          name: "Task Status",
          type: "pie",
          radius: ["40%", "70%"],
          center: ["50%", "40%"],
          avoidLabelOverlap: false,
          labelLine: {
            show: false,
            length: 0,
          },
          label: {
            show: true,
            distanceToLabelLine: 0,
            fontSize: +this.inner_content_height || 12,
            fontWeight: "bold",
            formatter: "{c}",
          },
          data: this.chartData,
          color: ['#009933', '#ffcc00'],
        },
      ],
    };
  }

  logout() {
    localStorage.removeItem("UserDetails");
    this.router.navigate(['/login']);
    this.common.snackbar1("User logged out.","warning")
  }
}