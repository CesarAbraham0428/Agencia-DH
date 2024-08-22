import { Component, Renderer2, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../../core/services/login.service';
import Swal from 'sweetalert2';
import { ServicioGenericoCRUD } from '../../../core/services/CRUDS/crud-servicio.service';

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
  openPaqueteKey: string | null = null;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private genericService: ServicioGenericoCRUD
  ) {}

  ngOnInit() {
    this.cargarPaquetes();
    this.loadPayPalScript();
  }

  cargarPaquetes() {
    this.genericService.getPaquetesCompletosByAgencia().subscribe(
      (data: AgenciaPaquetes[]) => {
        this.paquetesPorAgencia = data;
        this.paquetesPorAgencia.forEach(agencia => {
          agencia.paquetes.forEach(paquete => {
            const key = `${agencia.id_agencia}_${paquete.id_paquete}`;
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

  isPaqueteOpen(agenciaId: number, paqueteId: number): boolean {
    return this.openPaqueteKey === `${agenciaId}_${paqueteId}`;
  }

  obtenerPaquete(agenciaId: number, paqueteId: number) {
    const key = `${agenciaId}_${paqueteId}`;

    if (this.isButtonClicked[key] && this.isPaqueteOpen(agenciaId, paqueteId)) {
      return;
    }

    this.isButtonClicked[key] = true;

    if (this.loginService.isLogged()) {
      this.showPayPalButton[key] = true;
      this.openPaqueteKey = key;
      setTimeout(() => this.renderPayPalButton(key), 0);
    } else {
      Swal.fire({
        title: "Inicia sesión",
        text: "¡Necesitas iniciar sesión!",
        icon: "info"
      }).then(() => {
        this.router.navigate(['/login']);
      });
      this.isButtonClicked[key] = false;
    }
  }

  togglePaquete(agenciaId: number, paqueteId: number) {
    const key = `${agenciaId}_${paqueteId}`;

    if (this.isPaqueteOpen(agenciaId, paqueteId)) {
      this.openPaqueteKey = null;
    } else {
      this.openPaqueteKey = key;
      if (this.showPayPalButton[key]) {
        setTimeout(() => this.renderPayPalButton(key), 0);
      }
    }
  }

  renderPayPalButton(key: string): void {
    const containerId = `paypal-button-container-${key}`;
    const container = document.getElementById(containerId);

    // Limpiar el contenedor antes de renderizar el botón de PayPal
    if (container) {
      container.innerHTML = '';
    }

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
        this.isButtonClicked[key] = false; // Restablecer la bandera si hay un error
      }
    }).render(`#${containerId}`);
  }


  loadPayPalScript(): void {
    const script = this.renderer.createElement('script');
    script.src = 'https://www.paypal.com/sdk/js?client-id=AV2jLZ7GXiCjZZmqeYS2i0rHrbX9JRY9eipSrxK9XxtCTv0D4qtmrhSy2VMxHqibuVzzk2ykXP7p9-Jd&components=buttons';
    script.onload = () => {
      console.log("PayPal SDK cargado correctamente");
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
