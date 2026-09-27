# Stack Y Arquitectura Base

Estado: vigente al 27 de septiembre de 2026.

## Stack Propuesto

| Área | Tecnología | Responsabilidad |
| --- | --- | --- |
| Frontend | Next.js, React y TypeScript | Interfaz web y navegación |
| UI | Tailwind CSS, shadcn/ui y Lucide | Estilos y componentes reutilizables |
| Datos frontend | TanStack Query y Zod | Consultas, caché y validación |
| Backend | NestJS, Express, TypeScript y CommonJS | API y reglas de negocio |
| Tiempo real | WebSockets / Socket.IO | Capacidad futura, no implementada todavía |
| API de datos | PostgREST | Exposición controlada de lecturas simples |
| Persistencia | PostgreSQL | Datos, integridad y transacciones |
| Procesamiento | Redis | Capacidad futura para caché, colas y trabajos asíncronos |
| Infraestructura | Docker y Docker Compose | Entornos reproducibles |
| Calidad | Vitest y Playwright | Pruebas unitarias y E2E |
| API | OpenAPI / Swagger | Documentación de endpoints |

## Separación De Responsabilidades

```text
Next.js       -> presentación
NestJS        -> API pública y lógica de negocio
PostgREST     -> lecturas simples autorizadas, cuando corresponda
PostgreSQL    -> persistencia, integridad y fuente de verdad
Redis         -> capacidad futura, no fuente de verdad
WebSockets    -> capacidad futura de tiempo real
Docker        -> ejecución de servicios
```

El backend de `apps/api` se escribe con sintaxis moderna de TypeScript, pero se
emite como CommonJS. Su `tsconfig.json` conserva `module` y
`moduleResolution` en `nodenext`; el `package.json` local define
`"type": "commonjs"`. El script `database/scripts/migrate.mjs` permanece en
ESM porque la extensión `.mjs` lo determina explícitamente.

El frontend no decide estados críticos como si una persona puede pagar o si un pago está confirmado. Esas decisiones pertenecen al backend y deben quedar respaldadas por la base de datos.

## Exposición Por Autorización Explícita

La exposición de datos sigue el principio de mínimo privilegio:

```text
app -> tablas internas del sistema
api -> vistas y funciones autorizadas
anon -> sin acceso por defecto
```

PostgREST utilizará el esquema `api`. Ninguna tabla o función se considera pública por estar creada; cada objeto que deba exponerse tendrá que recibir un permiso explícito mediante una migración. Las tablas sensibles, como usuarios, pagos y auditoría, no se expondrán directamente.

El esquema `public` no será la frontera de la API. Se reserva para objetos internos o compatibilidad de PostgreSQL.

## Flujo De Comunicación

- Las consultas simples podrán usar PostgREST únicamente después de definir autenticación, RLS y permisos explícitos.
- Las operaciones que validan asistencia, generan órdenes, emiten QR o confirman pagos pasan por NestJS.
- NestJS no será un proxy obligatorio de PostgREST; para operaciones transaccionales accederá directamente a PostgreSQL mediante su capa de persistencia.
- PostgreSQL es la fuente de verdad para asistencia, órdenes y pagos.
- Redis no participa todavía en la lógica de negocio.
- WebSockets no participa todavía en el flujo funcional.

## Servicios Iniciales

La composición local podrá incluir:

```text
web -> api -> postgres
          ├-> postgrest -> postgres (lecturas autorizadas, fase posterior)
          └-> redis (fase posterior)
```

Los servicios se incorporarán gradualmente al implementar cada caso de uso. Este documento define límites y decisiones; no obliga a utilizar todos los componentes desde el primer día.
