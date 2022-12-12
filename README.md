# API Cuéntame

## Instrucciones
1.- Instalar dependencias `yarn` o `npm install`
(El proyecto fue hecho inicialmente con yarn pero seguramente también funciona con npm)

2.- Generar el build y correr aplicación `yarn start` o `npm run start`

## Rutas
```
api/auth/login
api/auth/register
api/comment/find (requiere autenticación)
api/comment/save (requiere autenticación)
api/blog/save (requiere autenticación)
api/blog/title (requiere autenticación)
```

## Autenticación
La API funciona con un Bearer Token generado con jwt, el cual se puede generar con la ruta de logueo (ver sección de rutas).
Colocar este token en el Header de Authorization.

## Notas
No pude usar la capa de amazon gratuita porque ya la había usado anteriormente, sin embargo busqué alternativas para la BD. Sin embargo, ya he usado Amazon en mi trabajo anterior, siendo este el principal motor que corría los proyectos de los entonces clientes.

De la imagen usé `multer js` pero no lo usé por lo mismo que no encontré una alternativa rápida. Pero dejé el archivo de configuración en el proyecto. Se encuentra en `src/application/middlewares/upload.middleware.ts`

### Lenguajes, herramientas y librerías usadas
- Typescript
- Javascript
- Sequelize
- JWT
- Express
- Morgan
- Multer
- Morgan
- Cors
- BCrypt
- Module Alias
- Winston
- Translate
- Cookie Parser
- Dot Env
- Eslint
- Yarn