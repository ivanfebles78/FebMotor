# iOS y Android

Propuesta: una aplicación React Native con Expo para clientes y una vista móvil de tareas para mecánicos. Un mismo repositorio, servidor y base de datos; interfaces adaptadas al contexto.

## API disponible

- `POST /api/register` y `/api/login`: correo/contraseña; añadir `mobile: true` devuelve un token opaco además de crear la cookie web.
- Guardar el token en Expo SecureStore (nunca AsyncStorage ni código fuente).
- `GET /api/me`: datos filtrados por identidad; enviar `Authorization: Bearer TOKEN`.
- `GET /api/directory`: centros y servicios públicos.
- `GET /api/slots?serviceId=...&day=YYYY-MM-DD`: disponibilidad.
- `POST /api/book`, `/api/vehicle`, `/api/decide`: acciones de cliente.
- `POST /api/task`, `/api/update`, etc.: acciones del taller, con permisos del servidor.
- `POST /api/logout`: revocar la sesión y borrar el token del teléfono.

Configurar la URL HTTPS real de Railway como `EXPO_PUBLIC_API_URL`; no incluir DATABASE_URL ni credenciales de proveedores en la app.

## Trabajo pendiente

Crear proyecto Expo, navegación, accesibilidad, almacenamiento seguro, inicio de sesión, reserva, seguimiento, presupuestos, carga de fotos y firmas; gestionar cambios de sesión y estados de red. Probar en dispositivos físicos iOS y Android y preparar distribución de prueba. No están generados ni verificados binarios móviles en esta entrega.

Expo Build puede compilar ambos sistemas. Las publicaciones requieren las cuentas de desarrollador correspondientes y revisión de las tiendas. Las apps no se alojan en Railway: consumen la API alojada allí.
