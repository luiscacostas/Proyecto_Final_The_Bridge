### TOKEN GO!

####Descripcion del Proyecto

Este proyecto es una aplicación web interactiva que permite a los usuarios explorar un mapa con tokens que representan sitios turísticos en una ciudad. Los usuarios pueden registrarse, iniciar sesión y capturar tokens cuando están cerca de ellos. La aplicación muestra rutas y calcula la distancia y el tiempo recorrido por el usuario. Además, los usuarios pueden ver las rutas capturadas en su perfil.

##### Link del Proyecto: https://proyecto-final-the-bridge-1.onrender.com/

####Funcionalidades

###### Registro y Autenticación de Usuarios:
- Los usuarios pueden registrarse e iniciar sesión en la aplicación.
- Los roles de usuario y administrador están soportados.
###### Mapa Interactivo:
- Muestra un mapa con tokens que representan sitios turísticos.
- Los usuarios pueden capturar tokens cuando están cerca de ellos.
- Los tokens capturados se guardan en la colección del usuario.
###### Seguimiento de Rutas:
- Los usuarios pueden iniciar y detener el seguimiento de su ubicación en tiempo real.
- La aplicación calcula y muestra la distancia total y el tiempo de la ruta.
- Las rutas capturadas se guardan y se muestran en el perfil del usuario.
###### Dashboard de Administrador:
- Los administradores pueden gestionar los usuarios y los tokens.
- Permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar).

####Tecnologías Usadas

#####Frontend
- React: Biblioteca de JavaScript para construir interfaces de usuario.
- Vite: Herramienta de desarrollo que proporciona un entorno de desarrollo rápido.
- Leaflet: Biblioteca de mapas de código abierto.
- SCSS: Preprocesador CSS que permite el uso de variables, anidamiento y mixins.

#####Backend
- Express: Framework web de Node.js.
- MongoDB: Base de datos NoSQL utilizada para almacenar datos de usuarios, tokens y rutas.
- Mongoose: ODM para MongoDB.
- jsonwebtoken (JWT): Biblioteca para manejar la autenticación mediante tokens.
- Socket.io: Biblioteca para manejar la comunicación en tiempo real.

#####Estructura del proyecto

```javascript
token-app/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   ├── main.jsx
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── server.js
│   ├── .env
│   ├── package.json

```
#####Pasos para Ejecutar el Proyecto

1. Clonar el Repositorio:
```bash
git clone <url_del_repositorio>
cd token-app
```
2. Crea un archivo .env en la raíz del proyecto y añade las siguientes variables:
```bash
MONGO_URI=mongodb://localhost:27017/token-app
JWT_SECRET=your_jwt_secret
```
3. Instalar Dependencias
```bash
npm install
cd client
npm install
cd ..
```
4.Iniciar Servidor 
```bash
npm run dev
```
5. Iniciar el Servidor en desarrollo
```bash
npm run dev
```
6. Construir Frontend para produccion
```bash
cd client
npm run build
```
7. Iniciar servidor en produccion
```bash
npm start
```
¡Gracias por tu interés en el Proyecto Final - The Bridge! - TOKEN GO!
Luis Carlos Acosta