import { Component } from '@angular/core';
import { SiderbarItemComponent, vTexto, vImage,  } from '../../index';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SiderbarItemComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  public varText = vTexto.sidebar;
  public vImage = vImage.sidebar
  
}
