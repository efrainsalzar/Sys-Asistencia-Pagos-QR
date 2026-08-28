# Stack Y Arquitectura Base

## Stack Propuesto

| Área | Tecnología | Responsabilidad |
| --- | --- | --- |
| Frontend | Next.js, React y TypeScript | Interfaz web y navegación |
| UI | Tailwind CSS, shadcn/ui y Lucide | Estilos y componentes reutilizables |
| Datos frontend | TanStack Query y Zod | Consultas, caché y validación |
| Backend | NestJS, Fastify y TypeScript | API y reglas de negocio |
| Tiempo real | WebSockets / Socket.IO | Actualizaciones inmediatas |
| API de datos | PostgREST | CRUD y consultas simples sobre PostgreSQL |
| Persistencia | PostgreSQL | Datos, integridad y transacciones |
| Procesamiento | Redis | Caché, colas y trabajos asíncronos |
| Infraestructura | Docker y Docker Compose | Entornos reproducibles |
| Calidad | Vitest y Playwright | Pruebas unitarias y E2E |
| API | OpenAPI / Swagger | Documentación de endpoints |

## Separación De Responsabilidades

```text
Next.js       -> presentación
NestJS        -> lógica de negocio
PostgREST     -> acceso simple a datos
PostgreSQL    -> persistencia e integridad
Redis         -> caché y procesamiento asíncrono
WebSockets    -> comunicación en tiempo real
Docker        -> ejecución de servicios
```

El frontend no decide estados críticos como si una persona puede pagar o si un pago está confirmado. Esas decisiones pertenecen al backend y deben quedar respaldadas por la base de datos.

## Flujo De Comunicación

- Las consultas simples pueden usar PostgREST.
- Las operaciones que validan asistencia, generan órdenes, emiten QR o confirman pagos pasan por NestJS.
- PostgreSQL es la fuente de verdad para asistencia, órdenes y pagos.
- Redis se utiliza para notificaciones y tareas que no deben bloquear la respuesta principal.
- WebSockets notifica cambios relevantes al dashboard y a los usuarios conectados.

## Servicios Iniciales

La composición local podrá incluir:

```text
web -> api -> postgrest -> postgres
             api -> redis
```

Los servicios se incorporarán gradualmente al implementar el primer alcance. Este documento define la dirección técnica, no obliga a construir todos los componentes desde el primer día.
