import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-vaccination-edit',
  templateUrl: './vaccination-edit.component.html',
  styleUrls: ['./vaccination-edit.component.scss']
})
export class VaccinationEditComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    
  }

}
