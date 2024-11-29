import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [],
  templateUrl: './error.page.component.html',
  styleUrl: './error.page.component.scss',
})
export class ErrorPage implements OnInit {
  public history: History = history;
  constructor(private activatedRoute: ActivatedRoute) {}
  public ngOnInit(): void {}
}
