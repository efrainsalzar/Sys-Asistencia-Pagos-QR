# Flujo del sistema

## Flujo general

```text
1. El administrador crea la reunión.
   │
   ▼
2. Se habilita el registro de asistencia.
   │
   ▼
3. El asistente llega y presenta su credencial.
   │
   ▼
4. El operador escanea o ingresa el ID.
   │
   ▼
5. El sistema registra la asistencia y genera una orden de pago única.
   │
   ▼
6. Se genera un QR único para esa reunión y se envía en segundo plano.
   │
   ▼
7. El asistente ingresa y decide pagar por QR o en efectivo.
   │
   ▼
8. Si paga por QR, el sistema confirma el pago y actualiza el estado.
   │
   ▼
9. Si no paga por QR, al final de la reunión se gestiona el cobro en efectivo.
```

## Reunión como unidad principal

Cada reunión se maneja como una entidad independiente con su propio historial.

```text
Reunión
  ├── Lista de asistentes
  ├── Órdenes de pago
  ├── Pagos QR
  ├── Pagos en efectivo
  └── Reporte final
```
