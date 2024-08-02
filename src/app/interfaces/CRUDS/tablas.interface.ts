export interface Paquete{
  id_paquete: number;
  nom_paquete: string;
  tipo_paquete: string
  costo_paquete: number;
}

export interface Hosteleleria { //Para la tabla Hotesteleria
    id_hoteleria: number;
    nom_hs: string;
    descripcion_hs: string;
    accesibility_infrastr_hs: string;
    tipologia_hs: string;
    costo_hs: string;
    capacidad_hs: string;
    servicios: string;
  }
  
  export interface Guia { //Para la tabla Guia
    id_guia: number;
    nom_guia: string;
    apellido_guia: string;
    nomcalle_guia: string;
    comunidad_guia: string;
    categoria_guia: string,
    telefono_guia: string;
    costo_guia: number;
    email_guia: string;
    
  }

  export interface Transportista { //Para la tabla Transportista
    id_trans: number;
    nom_trans: string;
    apellidos_trans: string;
    alcance_trans: string;
    email_trans: string;
    tarifa_trans: string;
    servicios_trans: string;
    tel_trans: string;
    
  }
  
  // Pueden añadir más interfaces aquí según sea necesario