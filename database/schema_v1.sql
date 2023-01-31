CREATE DATABASE mandeCorporation
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'C'
    LC_CTYPE = 'C'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    TEMPLATE template0;

\c mandeCorporation

CREATE TABLE Cliente
(
    celular VARCHAR(32) PRIMARY KEY,
    nombres VARCHAR(64) ,
    apellidos VARCHAR(64),
    passwordC VARCHAR(128),
    direccion VARCHAR(128) ,
    correoE VARCHAR(128)
);

CREATE TABLE Trabajador
(
    celular VARCHAR(32) PRIMARY KEY,
    nombres VARCHAR(64),
    apellidos VARCHAR(64),
    passwordT VARCHAR(128),
    direccion VARCHAR(64)
);

CREATE TABLE Tarjeta
(
    tipo VARCHAR(32),
    noTarjeta VARCHAR(32),
    codigoSeguridad VARCHAR(128),
    celular VARCHAR(32),
    CONSTRAINT fk_tarjeta_cliente FOREIGN KEY (celular) REFERENCES Cliente (celular)
);

CREATE TABLE Servicio 
(
    celular VARCHAR(32),
    nombreServicio VARCHAR(64),
    descPagos VARCHAR(128),
    PRIMARY KEY (celular, nombreServicio),
    CONSTRAINT fk_servicio_trabajador FOREIGN KEY (celular) REFERENCES Trabajador (celular)
);