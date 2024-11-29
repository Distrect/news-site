import { Component, Input } from '@angular/core';
import { IArticle } from '@common';
import { TitlePipe } from 'pipes/titlePipe/title-pipe.pipe';

@Component({
  selector: 'news-card',
  standalone: true,
  imports: [TitlePipe],
  templateUrl: './news-card.component.html',
  styleUrl: './news-card.component.scss',
})
export class NewsCardComponent {
  @Input({ alias: 'article', required: true }) public article!: IArticle;

  public getAuthor() {
    const { id, name } = this.article.source;
  }
}
