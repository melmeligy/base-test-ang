import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  @ViewChild('f', { static: false }) searchForm: NgForm;

  constructor(private router: Router) { }

  ngOnInit() {
    //this.buildings = this.buildingsService.section1_buildings;
    //this.showResult(-1,-1);

  }

  onSubmit() {

    const buildingNo = this.searchForm.value.buildingNo;
    const flatNo = this.searchForm.value.flatNo;

    this.router.navigate(['/details/'+buildingNo+'/'+flatNo ]);
  }
}
