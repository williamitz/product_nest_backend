<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

1. Clonar proyecto
```
git clone git@github.com:williamitz/nest-shell.git
```

2. Clonar archivo __.env.template__ y renombrar a __.env__

3. Configurar variables de entorno en archivo __.env__

4. Levantar base de datos
```
docker-compose up -d
```

5. Ejecutar config seed
```
yarn seed:config
```

6. Ejecutar seeder
```
yarn seed:run
```

7. Correr aplicación
```
yarn start:dev
```

## Stack 
Nest
TypeOrm
