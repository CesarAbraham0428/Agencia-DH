export interface Paquete{

  id_paquete: number;
  nombre: string;
  costo: number;
  tipo: string
}

export interface Hotel { //Para la tabla Hotel
    id_hotel: number;
    nombre: string;
    // ... otros campos
  }
  
  export interface Restaurante { //Para la tabla Restaurante
    id_restaurante: number;
    nombre: string;
    // ... otros campos
  }
  
  // Puedes añadir más interfaces aquí según sea necesario