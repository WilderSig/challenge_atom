import { Component} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule,MatButtonModule, MatTooltipModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {


  logout(): void {
    // Aquí puedes eliminar tokens de sesión o cualquier otra lógica
    console.log('Cerrando sesión...');
  }


}
