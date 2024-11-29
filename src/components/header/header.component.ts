import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Event, NavigationEnd, Router, RouterLink } from '@angular/router';
import { categories } from '@common';

@Component({
  selector: 'page-header',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],

  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  public categories = categories;
  public isOpen: boolean = false;
  public currentActive: string = 'Home';

  public search = new FormControl<string>('');

  constructor(private router: Router) {}

  public ngOnInit(): void {
    this.router.events.subscribe(this.navigationEvent.bind(this));
  }

  private navigationEvent(event: Event) {
    if (!(event instanceof NavigationEnd)) return;

    const { url } = event;

    if (url.includes('**') || url.includes('search')) this.currentActive = '';
  }

  public openSideBar() {
    this.isOpen = true;
  }

  public closeSideBar() {
    this.isOpen = false;
  }

  public clickItem(item: string) {
    this.currentActive = item;
    this.closeSideBar();
  }
  public searchNews() {
    if (!this.search.value) return;
    this.router.navigate(['search'], { queryParams: { q: this.search.value } });

    this.search.reset();
  }
}
