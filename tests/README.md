# Pruebas

Pruebas que atraviesan más de una aplicación o paquete.

- `unit/`: pruebas unitarias independientes.
- `integration/`: interacción con base de datos, Redis o adaptadores.
- `e2e/`: flujos completos desde la interfaz o API.

Las pruebas propias de una aplicación pueden permanecer junto a ella, especialmente en `apps/api/test`.
