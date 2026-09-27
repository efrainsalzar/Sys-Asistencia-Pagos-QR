# Estructura Del Proyecto

El proyecto utiliza una organización tipo monorepo. La regla principal es separar aplicaciones ejecutables, código compartido, persistencia, infraestructura, automatizaciones y documentación.

```text
Sys-Asistencia-Pagos-QR/
├── apps/
│   ├── api/                 # Backend NestJS + Express + CommonJS
│   └── web/                 # Frontend Next.js
├── packages/
│   ├── config/              # Configuración compartida
│   ├── contracts/           # Tipos y contratos frontend/backend
│   └── ui/                  # Componentes visuales compartidos
├── database/
│   ├── migrations/          # Evolución del esquema PostgreSQL
│   ├── seeds/               # Datos de desarrollo y prueba
│   └── scripts/             # Automatizaciones SQL
├── infra/
│   ├── compose/             # Docker Compose por ambiente
│   └── docker/              # Dockerfiles y configuración de imágenes
├── scripts/                 # Automatizaciones del proyecto
├── tests/
│   ├── e2e/                 # Pruebas de extremo a extremo
│   ├── integration/         # Pruebas de integración
│   └── unit/                # Pruebas unitarias transversales
├── docs/                    # Documentación funcional y técnica
│   └── arquitectura/       # Stack y límites técnicos
└── README.md                # Punto de entrada
```

## Reglas De Organización

- La lógica de negocio pertenece a `apps/api`, agrupada por módulos de dominio.
- El frontend consume contratos y servicios; no decide estados críticos de pagos o asistencia.
- Los tipos compartidos van en `packages/contracts` cuando sean parte de la comunicación entre aplicaciones.
- Los cambios de base de datos se registran en `database/migrations`.
- Los secretos y archivos `.env` reales no se versionan.
- La documentación general va en `docs`; cada directorio técnico puede tener su propio README.

## Convención De Módulos

Los módulos del backend deben organizarse por capacidad de negocio, por ejemplo `asistencia`, `pagos`, `reuniones`, `personas` y `notificaciones`. Al inicio, un módulo puede mantener una estructura simple con DTOs, controlador, servicio y módulo. Se separará en `domain`, `application`, `infrastructure` y `presentation` cuando la complejidad lo justifique.

## Estado De La Estructura

El API ya contiene las fundaciones de configuración, conexión a PostgreSQL, health check y el módulo inicial `organizacion`. Los demás dominios se irán completando después de estabilizar sus migraciones y contratos.


---
apps/
└── api/
    ├── src/
    │   ├── main.ts
    │   ├── app.module.ts
    │   ├── app.controller.ts
    │   ├── app.service.ts
    │   │
    │   ├── config/
    │   │   ├── configuration.ts
    │   │   └── env.validation.ts
    │   │
    │   ├── database/
    │   │   ├── database.module.ts
    │   │   └── database.service.ts
    │   │
    │   ├── health/
    │   │   ├── health.module.ts
    │   │   └── health.controller.ts
    │   │
    │   ├── common/
    │   │   ├── decorators/
    │   │   ├── filters/
    │   │   ├── guards/
    │   │   ├── interceptors/
    │   │   ├── pipes/
    │   │   └── types/
    │   │
    │   └── modules/
    │       ├── organizacion/
    │       ├── persona/
    │       ├── usuario/
    │       ├── rol/
    │       ├── reunion/
    │       └── asistencia/
    │
    ├── test/
    └── package.json
