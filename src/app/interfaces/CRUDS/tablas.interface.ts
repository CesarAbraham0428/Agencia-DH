export interface Paquete{
  id_paquete: number;
  nom_paquete: string;
  tipo_paquete: string
  costo_paquete: number;
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