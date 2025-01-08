import { Component, OnInit } from '@angular/core';
import {
  faTable,
  faChartLine,
  faUser,
  faFile,
} from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css'],
    standalone: false
})
export class SidebarComponent implements OnInit {
  timesheetIcon = faTable;
  performanceIcon = faChartLine;
  myprofileIcon = faUser;
  filesIcon = faFile;

  constructor() {}

  ngOnInit(): void {}
}
