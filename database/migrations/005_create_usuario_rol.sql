CREATE TABLE IF NOT EXISTS app.usuario_rol (
    usuario_id INT NOT NULL,
    rol_id INT NOT NULL,

    PRIMARY KEY (usuario_id, rol_id),

    CONSTRAINT fk_usuario_rol_usuario
        FOREIGN KEY (usuario_id)
        REFERENCES app.usuario (id)
        ON UPDATE RESTRICT
        ON DELETE CASCADE,

    CONSTRAINT fk_usuario_rol_rol
        FOREIGN KEY (rol_id)
        REFERENCES app.rol (id)
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
);