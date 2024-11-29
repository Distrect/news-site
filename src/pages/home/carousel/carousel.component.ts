import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { IArticle } from '@common';

@Component({
  selector: 'carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class CarouselComponent implements OnInit {
  @Input({ required: true, alias: 'slides' }) public slides: IArticle[] | null =
    null;

  public activeIndex: number = 0;

  constructor() {}

  public ngOnInit(): void {}

  public convertDate(date: string) {
    const dt = new Date(date);

    return `${dt.getDay()}/${dt.getMonth()}/${dt.getFullYear()}`;
  }

  public setPrevSlide() {
    if (this.activeIndex === 0) {
      this.activeIndex = 2;
      return;
    }
    this.activeIndex = this.activeIndex - 1;
  }

  public setNextSlide() {
    if (this.activeIndex === 2) {
      this.activeIndex = 0;
      return;
    }
    this.activeIndex = this.activeIndex + 1;
  }
}
