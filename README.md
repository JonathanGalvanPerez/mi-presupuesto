# Mi Presupuesto
Aplicación web para administración de presupuesto personal.

<a href="https://mi-presupuesto.herokuapp.com/">![image](https://user-images.githubusercontent.com/44724362/116812798-fc019080-ab26-11eb-958a-b3789014ccf0.png)</a>

---

## Contenido:
- **Home:** visualización del balance actual, datos personales y últimas 10 transacciones.
- **Gestor de Movimientos:** permite agregar, eliminar y editar movimientos, como también filtrar por tipo y categoria.
- **Login:** autenticación de usuarios. Comprobación asíncrona del email.

## Instalación
_Dirigirse a la carpeta **/mi-presupuesto**._
```
npm install
```
_Iniciar servidor MySQL en el puerto 3306._

_Dirigirse a la carpeta **/mi-presupuesto/express-server**._
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
Nota: Para iniciar sesión las credenciales son _celeste@email.com_ y _111_ o _madeline@email.com_ y _123._

## Tecnologías
- Aplicación web desarrollada en *Typescript* con el framework *Angular*.
- Servidor API REST desarrollado en *Node.js* con el framework *Express Server*.
- Base de datos desarrollada localmente con *MySQL* y de modo online en *PostgreSQL*.
- Librerías utilizadas: *Reactive Forms*, *Rxjs*, *HTTP*, entre otras.
