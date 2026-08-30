CREATE INDEX IF NOT EXISTS idx_persona_organizacion
    ON app.persona (organizacion_id);

CREATE INDEX IF NOT EXISTS idx_usuario_persona
    ON app.usuario (persona_id);

CREATE INDEX IF NOT EXISTS idx_usuario_rol_rol
    ON app.usuario_rol (rol_id);

CREATE INDEX IF NOT EXISTS idx_reunion_organizacion
    ON app.reunion (organizacion_id);

CREATE INDEX IF NOT EXISTS idx_reunion_fecha
    ON app.reunion (fecha);

CREATE INDEX IF NOT EXISTS idx_asistencia_reunion
    ON app.asistencia (reunion_id);

CREATE INDEX IF NOT EXISTS idx_asistencia_persona
    ON app.asistencia (persona_id);

CREATE INDEX IF NOT EXISTS idx_auditoria_usuario
    ON app.auditoria (usuario_id);

CREATE INDEX IF NOT EXISTS idx_auditoria_fecha
    ON app.auditoria (fecha_hora);