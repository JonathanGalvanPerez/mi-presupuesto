## Mi Presupuesto
Aplicación web para administración de presupuesto personal.

---

### Features:
-*Home:* visualización del balance actual, datos personales y últimas 10 transacciones.
-*Gestor de Movimientos:* permite agregar, eliminar y editar movimientos, como también filtrar por tipo y categoria.
-*Login:* autenticación de usuarios. Comprobación asíncrona del email.

## Instrucciones de instalación
_Importar base de datos *mi-presupuesto.sql* a MySQL_
_Dirigirse a la carpeta */mi-presupuesto*_
`npm install`

## Despliegue
_Iniciar servidor MySQL en el puerto 3306_
_Dirigirse a la carpeta */mi-presupuesto/express-server*_
`node app.js`
_Dentro de la carpeta */mi-presupuesto*_
`ng serve`

## Tecnologías empleadas
-Aplicación web desarrollada en *Typescript* con el framework *Angular*.
-Servidor API REST desarrollado en *Node.js* con el framework *Express Server*.
-Base de datos desarrollada con MySQL.
