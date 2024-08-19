import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faSquareFacebook} from '@fortawesome/free-brands-svg-icons';
import { faPhoneVolume } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope} from '@fortawesome/free-solid-svg-icons';
 
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule,FontAwesomeModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  faInstagram=faInstagram;
  faSquareFacebook=faSquareFacebook;
  faPhoneVolume=faPhoneVolume;
  faWhatsapp=faWhatsapp;
  faEnvelope=faEnvelope



}
