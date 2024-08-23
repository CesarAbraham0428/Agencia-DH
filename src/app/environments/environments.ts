//Produccion
/* export const environment = {
  baseUrl: 'http://agencia-viajes'
} */

/* export const environment = {
  production: true,
  baseUrl: 'https://backenddhagencias-production-f839.up.railway.app'
}
 */

export const environment = {
  production: true,
  baseUrl: '${process.env.BACKEND_URL}'
};