# Devskilladv dashboard

## Requisitos

- [x] Los datos del formulario deben ser enviados a la API, la tabla de la derecha debe recibir los datos de la misma al cargarse el sitio.
- [x] Luego de cada inserción exitosa, se debe mostrar el nuevo miembro en la tabla, sin necesidad de volver a utilizar el endpoint GET.
- [x] El boton reset debe limpiar los campos del formulario.
- [x] El boton save debe enviar los datos a la API.
- [x] El número de seguro social (ssn) es único y no puede repetirse en la lista.
- [x] En caso de un intento de inserción erroneo, se debe informar dicho error.
- [x] Al pasar 2 minutos de inactividad, se debe refrescar la tabla automáticamente.

## Extras

- Página para login
- Después del request a `auth`, la página genera una cookie con el `token`, y caduca al pasar la fecha del valor `exp`
- Logout automático cuando caduca la cookie

## Ejecutar por primera vez

- Clonar este repositorio: `git clone https://github.com/EzeKoren/devskillsadv.git`
- Ubicarse en el directorio: `cd devskillsadv/web`
- Instalar las dependencias: `npm install`
- Ejecutar el servidor: `npm start`
