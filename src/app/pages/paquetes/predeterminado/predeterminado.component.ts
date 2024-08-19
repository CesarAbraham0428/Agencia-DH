import { Component, Renderer2, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { LoginService } from '../../../core/services/login.service';
import Swal from 'sweetalert2';
import { ServicioGenericoCRUD } from '../../../core/services/CRUDS/crud-servicio.service';
//import { Paquete } from '../../../interfaces/CRUDS/tablas.interface';

interface Actividad {
  id_actividad: number;
  fecha_actividad: string;
  hora_actividad: string;
  descripcion_actividad: string;
}

interface Servicio {
  id_servicio: number;
  tipo_servicio: string;
  actividades: Actividad[];
}

interface Paquete {
  id_paquete: number;
  nom_paquete: string;
  tipo_paquete: string;
  costo_paquete: number;
  img_paquete: string;
  servicios: Servicio[];
}

interface AgenciaPaquetes {
  id_agencia: number;
  nom_ag: string;
  paquetes: Paquete[];
}

declare var paypal: any;



@Component({
  selector: 'app-predeterminado',
  templateUrl: './predeterminado.component.html',
  styleUrls: ['./predeterminado.component.scss']
})
export class PredeterminadoComponent implements OnInit {

  paquetesPorAgencia: { id_agencia: number; nom_ag: string; paquetes: Paquete[] }[] = [];
  showPayPalButton: { [key: string]: boolean } = {};
  isButtonClicked: { [key: string]: boolean } = {};
  openPaqueteKey: string | null = null; // Para controlar el paquete abierto

  constructor(
    private loginService: LoginService,
    private router: Router,
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private genericService: ServicioGenericoCRUD
  ) { }


  ngOnInit() {
    this.cargarPaquetes();
  }

  cargarPaquetes() {
    this.genericService.getPaquetesCompletosByAgencia().subscribe(
      (data: AgenciaPaquetes[]) => {
        this.paquetesPorAgencia = data;
        console.log('Paquetes cargados:', this.paquetesPorAgencia);

        // Inicializar showPayPalButton e isButtonClicked para cada paquete
        this.paquetesPorAgencia.forEach(agencia => {
          agencia.paquetes.forEach(paquete => {
            const key = `${agencia.id_agencia}_${agencia.nom_ag}_${paquete.id_paquete}`;
            this.showPayPalButton[key] = false;
            this.isButtonClicked[key] = false;
          });
        });
      },
      error => {
        console.error('Error al obtener paquetes por agencia:', error);
      }
    );
  }

  togglePaquete(agenciaId: number, paqueteId: number) {
    const key = `${agenciaId}_${paqueteId}`;
    if (this.openPaqueteKey === key) {
      this.openPaqueteKey = null; // Cierra el paquete si ya está abierto
    } else {
      this.openPaqueteKey = key; // Abre el nuevo paquete
    }
  }

  isPaqueteOpen(agenciaId: number, paqueteId: number): boolean {
    return this.openPaqueteKey === `${agenciaId}_${paqueteId}`;
  }

  obtenerPaquete(agenciaId: number, paqueteId: number) {
    const key = `${agenciaId}_${paqueteId}`;
    if (this.isButtonClicked[key]) {
      return; // Prevent multiple executions
    }
    this.isButtonClicked[key] = true;

    if (this.loginService.isLogged()) {
      this.showPayPalButton[key] = true;
      this.renderPayPalButton(key);
    } else {
      Swal.fire({
        title: "Inicia sesión",
        text: "¡Necesitas iniciar sesión!",
        icon: "info"
      }).then(() => {
        this.router.navigate(['/login']);
      });
      this.isButtonClicked[key] = false; // Reset the flag if the user is not logged in
    }
  }

  renderPayPalButton(key: string): void {
    const interval = setInterval(() => {
      const container = document.getElementById(`paypal-button-container-${key}`);
      if (container) {
        clearInterval(interval);
        paypal.Buttons({
          onApprove: (data: any, actions: any) => {
            Swal.fire({
              title: "¡Gracias por su compra!.",
              width: 600,
              padding: "3em",
              color: "#716add",
              background: "#fff url(../../../../../../assets/trees.png)",
              backdrop: `
                rgba(0,0,123,0.4)
                url("../../../../assets/nyan-cat.gif")
                left top
                no-repeat
              `
            });
          },
          onError: (error: any) => {
            Swal.fire({
              title: "Error!",
              text: error,
              icon: "error"
            });
            this.isButtonClicked[key] = false; // Reset the flag if there is an error
          }
        }).render(`#paypal-button-container-${key}`);
      }
    }, 100);
  }

  loadPayPalScript(): void {
    const script = this.renderer.createElement('script');
    script.src = 'https://www.paypal.com/sdk/js?client-id=AV2jLZ7GXiCjZZmqeYS2i0rHrbX9JRY9eipSrxK9XxtCTv0D4qtmrhSy2VMxHqibuVzzk2ykXP7p9-Jd&components=buttons';
    script.onload = () => {
      for (const paquete in this.showPayPalButton) {
        if (this.showPayPalButton[paquete]) {
          this.renderPayPalButton(paquete);
        }
      }
    };
    script.onerror = (error: Event | string) => {
      console.error('Error loading PayPal SDK:', error);
      for (const paquete in this.isButtonClicked) {
        this.isButtonClicked[paquete] = false;
      }
    };
    this.renderer.appendChild(this.elementRef.nativeElement, script);
  }
}
