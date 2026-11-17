# Despliegue en Railway

## Crear los servicios

1. Crea un proyecto de Railway y añade PostgreSQL.
2. Añade un servicio desde el repositorio `ivanfebles78/FebMotor`.
3. Mantén el directorio raíz del repositorio. Railway usará el Dockerfile raíz y `railway.json`.
4. Configura `DATABASE_URL` con una referencia a la variable del servicio PostgreSQL (ejemplo habitual: `${{Postgres.DATABASE_URL}}`; usa el nombre real de tu servicio).
5. Genera un dominio público para la web y configura `APP_URL=https://dominio-real-del-servicio`. Debe coincidir exactamente con el origen que usarás en el navegador, sin ruta.
6. Despliega y comprueba `/api/health`. Solo devuelve éxito si puede consultar PostgreSQL.
7. Registra tu organización y el primer centro desde “Crear cuenta”. No se crean credenciales por defecto.

No es necesario fijar `PORT`: el servidor utiliza el asignado por Railway. Mantén HTTPS. Si añades un dominio propio, actualiza APP_URL al dominio usado por los usuarios. No se permite usar varios orígenes simultáneos en esta versión.

## Comprobación de funcionamiento

- Crea un taller con un servicio y un cliente con un vehículo.
- Reserva desde la cuenta del cliente un horario disponible.
- En recepción del taller, recibe la cita y crea la orden.
- Actualiza tareas y publicación para cliente; genera una propuesta adicional.
- Acepta desde el cliente y comprueba que aumenta una sola vez el importe.
- Marca recambios recibidos, termina tareas, pasa el control final y firma la recogida.
- Reinicia el servicio web: los registros deben mantenerse en PostgreSQL.
- Crea un segundo taller y verifica que no ve las órdenes del primero.

## Operación

Configura copias de seguridad y supervisión de PostgreSQL en el proveedor. Las firmas se guardan dentro de la orden como PNG; fotos y documentos requieren almacenamiento de objetos en una siguiente fase. El registro de acciones no es un registro inmutable certificado. Antes de uso comercial: recuperación/verificación de cuentas, condiciones y privacidad, gestión de conservación/exportación, auditoría de seguridad y migración del agregado JSONB.

Las integraciones de mensajería y pagos no están conectadas. No configures secretos de esos proveedores hasta incorporar su módulo.
