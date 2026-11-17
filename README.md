# FebMotor

**Tu coche, de principio a fin.** Plataforma web multi-taller para reservar citas, seguir reparaciones y autorizar trabajos adicionales.

## Estado

Versión inicial funcional **0.2**, orientada a un piloto. No representa todavía la totalidad del producto acordado. Incluye demostraciones explícitas con datos ficticios y cuentas reales con persistencia en PostgreSQL. La demo no se guarda ni envía avisos.

### Implementado

- Registro de clientes y organizaciones (taller independiente o cadena), inicio y cierre de sesión.
- Contraseñas con scrypt y sal aleatoria; sesiones opacas con expiración, cookie HTTP-only y token para futuro cliente móvil.
- Organizaciones aisladas y acceso de empleados limitado por centro. Notas internas y costes internos excluidos de las respuestas al cliente.
- Superadmin con vista global de organizaciones, centros, usuarios, vehículos, órdenes y auditoría; las cuentas de taller mantienen su aislamiento.
- Roles talleradmin, responsable_centro, recepcion y mecanico; permiso explícito de presupuesto para mecánicos.
- Varios centros, catálogo de servicios, precio, duración, horario y capacidad básica por centro.
- Vehículos por cliente, directorio de servicios, disponibilidad, reservas y cancelación.
- Recepción de una cita con kilometraje, combustible, llaves y daños anotados.
- Órdenes con tareas, fases, mensajes al cliente y ventana aproximada de entrega.
- Propuestas adicionales que el autorizador acepta o rechaza. Cada propuesta se acepta una sola vez.
- Recambios solicitados/recibidos y bloqueo de cierre si están pendientes.
- Control de calidad y firma dibujada para la recogida; las órdenes entregadas quedan cerradas.
- Historial del cliente y registro interno de acciones.
- Interfaz adaptable a móvil, tableta y ordenador.

### Pendiente antes de un lanzamiento comercial

Ver [alcance y próximos módulos](docs/PRODUCTO.md). En particular: personalización avanzada, permisos editables tras el alta, acceso compartido/delegación, registro de citas telefónicas y sin cita, recursos y empleados individuales en agenda, fotos y documentos, presupuesto inicial desglosado/aceptación parcial, diagnóstico descontable, límites de gasto, señales y políticas de cancelación, recordatorios, email/SMS/WhatsApp, pagos, facturación, recuperación/verificación de correo y apps nativas.

**No hay envíos externos, cobros ni facturas fiscales.** Los presupuestos de esta versión son importes totales de servicio y propuestas adicionales, no un sistema de facturación.

## Desarrollo

Node.js 22 o superior y PostgreSQL 16 o superior.

```bash
npm ci
export DATABASE_URL='postgresql://postgres:postgres@localhost:5432/febmotor'
export APP_URL='http://localhost:3000'
npm run dev
```

Abre http://localhost:3000. Para explorar sin base de datos, usa **Demo cliente** o **Demo taller** en el acceso. Para cuentas reales configura PostgreSQL: no existe fallback silencioso a memoria.

```bash
npm test
npm run build
npm start
```

Las tablas se crean automáticamente al primer acceso al servidor. No se cargan usuarios ni contraseñas predeterminados. Registra un taller y un cliente con correos diferentes para probar una reparación real.

## Railway

Instrucciones: [docs/RAILWAY.md](docs/RAILWAY.md). El Dockerfile compila la web y el servidor, escucha en `PORT` y usa `/api/health` para comprobar la conexión real a PostgreSQL.

## Arquitectura

- `apps/web`: Next.js 16, React 19 y API Node.js.
- `packages/domain`: reglas compartibles con la futura aplicación móvil.
- `tests`: aislamiento, autorizaciones, agenda, firmas y contraseñas.
- `docs`: alcance y despliegue.

El almacenamiento inicial usa un agregado JSONB transaccional con bloqueo de fila en PostgreSQL. Esto evita dobles reservas y decisiones duplicadas dentro de esta implementación, pero serializa las escrituras de toda la plataforma. Es una base de piloto; hay que migrar a tablas normalizadas, índices y bloqueos por recurso antes de un uso de gran escala. No cambiar a varias filas sin mantener las garantías de aislamiento y concurrencia.

El idioma inicial es español y los centros se crean con zona `Atlantic/Canary`, lunes a viernes. La personalización de calendario y zona horaria por centro está pendiente.

## Móvil

La web ya es adaptable, pero **no es todavía una aplicación nativa ni una PWA offline**. La siguiente entrega será React Native + Expo para iOS y Android usando la misma API. Railway aloja el backend; Expo compila y las tiendas distribuyen los binarios. Ver [docs/MOBILE.md](docs/MOBILE.md).

## Administración de plataforma

El superadmin inicia sesión con el identificador `superadmin` y dispone de un panel global. Su cuenta se aprovisiona de forma privada y no se puede crear mediante el registro público ni mediante los permisos de un taller. Las respuestas de la API nunca incluyen hashes de contraseñas. El acceso global no permite aceptar presupuestos en nombre del cliente: la autorización económica sigue correspondiendo a la persona designada.
