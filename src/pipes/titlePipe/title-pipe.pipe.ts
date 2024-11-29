import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titlePipe',
  standalone: true,
})
export class TitlePipe implements PipeTransform {
  transform(value: string): string {
    return value.split(' - ')[0].trim();
  }
}
