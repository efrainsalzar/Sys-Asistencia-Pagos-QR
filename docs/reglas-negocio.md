# Reglas de negocio

## Reglas del QR

- Se genera solo después de registrar la asistencia.
- Está asociado a una persona, una reunión y una orden de pago.
- Solo puede utilizarse una vez.
- Tiene fecha de expiración.
- Se invalida después de confirmar el pago.

## Cuotas pendientes

- Si una persona no paga en una reunión, queda con una cuota pendiente.
- En la siguiente reunión el sistema detecta la deuda y ajusta el monto.
- Si se acumulan varias cuotas pendientes, el pago puede volverse obligatorio antes de cerrar la participación.
- Este límite debe poder configurarse por organización.

## Estados de una orden de pago

- Pendiente
- Pagado por QR
- Pagado en efectivo
- Vencido
- Anulado

## Estados del asistente en una reunión

| Asistencia | Pago | Estado |
| ---------- | ---- | ------ |
| No | - | No asistió |
| Sí | Pendiente | Asistió - Pendiente |
| Sí | QR | Asistió - Pagó por QR |
| Sí | Efectivo | Asistió - Pagó en efectivo |
