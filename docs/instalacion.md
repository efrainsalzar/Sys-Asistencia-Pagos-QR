# Instalación Y Comandos

Registro resumido del entorno inicial y de los comandos operativos del monorepo.

## Estado Actual

La instalación base está completada y el workspace reconoce:

- `apps/api`: NestJS con TypeScript, ESM y Vitest.
- `apps/web`: Next.js con React, TypeScript, Tailwind CSS y ESLint.
- `packages/*`: espacio reservado para paquetes compartidos.

El gestor oficial del proyecto es `pnpm`.

## Versiones Registradas

```text
Node.js 24 LTS
pnpm    11.24.0
npm     11.19.0
```

Las versiones de las aplicaciones se mantienen en sus respectivos `package.json`. Las versiones anteriores son el registro del entorno utilizado para la instalación inicial.

## Workspace

El archivo `pnpm-workspace.yaml` incluye:

```yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

Los comandos de workspace deben ejecutarse desde la raíz del proyecto:

```powershell
cd D:\github\Sys-Asistencia-Pagos-QR
pnpm install
pnpm -r list --depth -1
```

## Ejecutar Aplicaciones

Backend:

```powershell
pnpm --filter api start:dev
```

Frontend:

```powershell
pnpm --filter web dev
```

También están disponibles para el backend `start`, `build`, `lint`, `test` y `test:e2e`; para el frontend, `build`, `start` y `lint`.

## Comandos De Generación

Como el proyecto utiliza pnpm, los comandos temporales se ejecutan con `pnpm dlx`:

```powershell
pnpm dlx @nestjs/cli ...
pnpm dlx create-next-app@latest ... --use-pnpm
```

No utilizar `npx` para generar o instalar las aplicaciones, porque puede activar el flujo de npm y entrar en conflicto con la política de `pnpm` definida en el workspace.

## Incidencias Resueltas

### Scripts bloqueados por pnpm

Si pnpm informa `ERR_PNPM_IGNORED_BUILDS`, revisar y aprobar únicamente los paquetes necesarios:

```powershell
pnpm approve-builds
pnpm install
```

En la instalación inicial se aprobó `unrs-resolver`.

### Observabilidad de NestJS

NestJS generó soporte opcional para `@nestjs/observe`, pero no se configuraron credenciales. `ObserveModule` quedó desactivado en `apps/api/src/app.module.ts` para evitar errores de telemetría `401`.

### README inicial de las aplicaciones

Los README que generaban conflicto durante los comandos de scaffolding fueron retirados únicamente dentro de `apps/api` y `apps/web`. La documentación general se mantiene en la raíz y en `docs/`.

## Advertencias

Durante la instalación de Next.js hubo reintentos de descarga desde el registro de npm y avisos de dependencias obsoletas. La instalación finalizó correctamente; estas advertencias deben revisarse cuando se actualicen dependencias, pero no requieren cambios manuales ahora.

## Alcance Pendiente

La instalación de aplicaciones está lista. Aún falta incorporar la infraestructura definida en la arquitectura:

- PostgreSQL y sus migraciones.
- PostgREST.
- Redis para caché y trabajos asíncronos.
- Docker Compose.
- Configuración de Fastify si se mantiene como servidor HTTP objetivo.

Este documento registra cómo levantar la base actual; la arquitectura objetivo está en [Stack y arquitectura base](arquitectura/stack-y-arquitectura.md).
