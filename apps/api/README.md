# Backend API

API principal del sistema. Aquí viven la autenticación, las reglas de negocio, la asistencia, los pagos, el QR y las notificaciones.

Estructura interna prevista:

- `src/modules/`: módulos organizados por dominio.
- `src/common/`: piezas transversales y utilidades compartidas.
- `src/infrastructure/`: base de datos, Redis, proveedores y adaptadores externos.
- `src/config/`: configuración validada por ambiente.
- `test/`: pruebas específicas del backend.
