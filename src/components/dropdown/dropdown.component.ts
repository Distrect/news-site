import { Component, Input } from '@angular/core';

interface IDropdownItem<T> {
  key: string;
  value: T;
}

@Component({
  selector: 'dropdown',
  standalone: true,
  imports: [],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
})
export class DropdownComponent {
  @Input({ alias: 'items', required: true }) public items!: string[];
}
