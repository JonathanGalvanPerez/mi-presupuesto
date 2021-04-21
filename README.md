# Mi Presupuesto
Aplicación web para administración de presupuesto personal.

---

## Contenido:
- **Home:** visualización del balance actual, datos personales y últimas 10 transacciones.
- **Gestor de Movimientos:** permite agregar, eliminar y editar movimientos, como también filtrar por tipo y categoria.
- **Login:** autenticación de usuarios. Comprobación asíncrona del email.

## Instalación
_Dirigirse a la carpeta **/mi-presupuesto**_
```
npm install
```
_Iniciar servidor MySQL en el puerto 3306._

_Dirigirse a la carpeta **/mi-presupuesto/express-server**_
```
node create-db.js
```
Nota: Si el usuario y contraseña son distintos de _'localhost'_ y _''_ respectivamente, editar las credenciales en el archivo **create-db.js** antes de ejecutarlo.

## Despliegue
_Iniciar servidor MySQL en el puerto 3306._

_Dirigirse a la carpeta **/mi-presupuesto/express-server**._
```
node app.js
```
_Dirigirse a la carpeta **/mi-presupuesto**._
```
ng serve
```

## Tecnologías
- Aplicación web desarrollada en *Typescript* con el framework *Angular*.
- Servidor API REST desarrollado en *Node.js* con el framework *Express Server*.
- Base de datos desarrollada con MySQL.
