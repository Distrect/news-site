import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
  // encapsulation: ViewEncapsulation.None,
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input({ alias: 'totalCount', required: true }) public totalCount!: number;
  @Input({ alias: 'pageSize', required: true }) public pageSize!: number;

  @Output('onPageNumchange')
  public pagenumEmitter = new EventEmitter<number>();

  public pageNumbers!: number[];

  public currentPage: number = 1;

  public ngOnInit(): void {
    const pageNums = Math.ceil(this.totalCount / this.pageSize);

    this.pageNumbers = new Array(pageNums).fill(0).map((_, index) => index + 1);
  }

  private setPageNumbers() {
    const pageNums = Math.ceil(this.totalCount / this.pageSize);

    this.pageNumbers = new Array(pageNums).fill(0).map((_, index) => index + 1);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (
      changes?.['totalCount']?.currentValue === 0 ||
      changes?.['pageSize']?.currentValue === 0
    )
      (this.pageNumbers = [1]), (this.currentPage = 1);

    this.setPageNumbers();
  }

  public onPageNumClick(pageNum: number) {
    this.pagenumEmitter.emit(pageNum);
    this.currentPage = pageNum;
  }
}
