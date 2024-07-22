// Example of a service or experience item
interface Item {
    type: string;
    fields: { [key: string]: string };
  }
  
  // Example items
  const hoteles: Item[] = [
    {
      type: 'hotel',
      fields: {
        nombre: 'Hotel Cocomacan',
        direccion: '123 Street',
        telefono: '123-456-7890',
        horarios: '24/7',
        descripcion: 'A nice hotel'
      }
    }
  ];
  
  const restaurantes: Item[] = [
    {
      type: 'restaurante',
      fields: {
        nombre: 'Restaurante Hidalgo',
        direccion: '456 Avenue',
        telefono: '098-765-4321',
        horarios: '8 AM - 10 PM',
        descripcion: 'A nice restaurant'
      }
    }
  ];
  