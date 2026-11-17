# Producto acordado y estado de entrega

## Modelo

Plataforma genérica para talleres y cadenas de distintas especialidades. Organización = taller independiente o cadena. Centro = ubicación física. Entre organizaciones no se comparten datos. Dentro de una cadena se permite el historial, sujeto a centros asignados al empleado. El cliente reúne la información publicada de sus vehículos en distintas organizaciones.

## Roles

Superadmin de plataforma con acceso global; talleradmin de su organización; responsable_centro de centros asignados; recepcion y mecanico. El taller determina si un mecánico puede presupuestar. Cliente es un tipo de usuario adicional, con acceso solo a sus intervenciones. No se permite autoasignar roles de plataforma.

## Recorrido

Solicitud online, telefónica o presencial → presupuesto conocido o autorización de diagnóstico → aceptación y cita → recepción documentada → diagnóstico → reparación y recambios → control final → listo para recoger → firma de entrega → historial y mantenimiento.

Los trabajos adicionales deben mostrar descripción, precio y efecto en el plazo, y quedar autorizados antes de ejecutarse. Se admitirán límites previos expresos y aceptación parcial de partidas compatibles. El diagnóstico puede cobrarse si se rechaza la reparación y descontarse de la reparación aceptada según configuración del taller. Debe evitarse descontarlo dos veces.

Los tiempos se muestran como rangos aproximados. Se distingue trabajo efectivo de espera y entrega prevista. La ubicación física no sustituye a la fase de trabajo. No hay chat.

## Matriz de alcance

| Módulo | Versión 0.1 | Siguiente desarrollo |
|---|---|---|
| Identidad | Registro, sesión, contraseñas protegidas | Verificación, recuperación, invitaciones |
| Talleres y cadenas | Organizaciones y varios centros | Personalización, calendario/zona por centro |
| Roles | Superadmin, cuatro roles de taller, cliente, permisos iniciales | Edición de permisos y asignaciones |
| Agenda | Capacidad básica, servicio y duración; reserva online | Empleados, elevadores, recursos, pausas, festivos, urgencias y entrada manual |
| Vehículos | Varios por cliente | Acceso compartido y autorizadores delegados |
| Recepción | Kilometraje, combustible, llaves y daños escritos | Fotos, checklist configurable y confirmación del cliente |
| Presupuestos | Precio del servicio y extras aceptables/rechazables | Inicial desglosado, versiones, partidas parciales, descuento diagnóstico, límites |
| Seguimiento | Fases, tareas, mensajes publicados y rangos | Tiempos por tarea, notificaciones y cambios con motivo obligatorio |
| Recambios | Registro manual, llegada estimada y recibido | Retrasado, incidencias, dependencias por tarea |
| Entrega | Control final y firma de recogida | Documentos y recomendación de mantenimientos |
| Historial | Intervenciones de la plataforma | Documentos importados y recordatorios |
| Comunicaciones | Consulta web | Correo, SMS y WhatsApp transaccionales con preferencias y entrega |
| Pagos | No conectado | Pago en taller registrado; online opcional; señales |
| Comercial | No conectado | Suscripciones por centro y planes; consumo de mensajería |
| Móvil | Web adaptable | Aplicaciones Expo para iOS/Android |

## Criterios importantes para siguientes versiones

- Un enlace de seguimiento debe ser opaco, revocable y limitado; no usar matrículas como autenticación. La versión 0.1 requiere sesión.
- Nunca exponer notas internas, costes o datos de otros clientes al filtrar el historial del particular.
- Una persona autorizadora por reparación, con delegación explícita y trazabilidad. Actualmente es el cliente que reserva.
- Separar aceptación del presupuesto, pago y firma de recogida: son actos diferentes.
- Mantener versiones con texto, precio, alcance, fecha y persona que acepta. El registro básico de acciones actual no sustituye ese versionado.
- Cita y ocupación real del vehículo no son equivalentes: contemplar depósito previo, espera y recursos liberados.
- La cancelación configurable, señales, ausencias y servicios con grúa requieren flujos específicos.
- Rechazo de trabajos y devolución sin reparar no deben obligar a simular una reparación completada. Pendiente un cierre específico.
- El historial no importa automáticamente intervenciones de talleres externos.
