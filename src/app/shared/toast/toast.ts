import { Component, Input } from '@angular/core';
import { TypeToast } from '../../core/models/types.models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  imports: [CommonModule],
  templateUrl: './toast.html',
  styleUrl: './toast.scss'
})
export class ToastComponent {
  @Input() show = false;
  @Input() message = '';
  @Input() type: TypeToast = 'info';
}
