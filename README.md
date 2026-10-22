# Sistema de Biblioteca

Sistema web básico para gestionar el catálogo de libros de una biblioteca.

- `backend/`: API REST con Spring Boot 3 (Java 17, JPA, H2 en memoria). Puerto 8080.
- `frontend/`: aplicación Angular 20 con Angular ESLint. Puerto 4200.

## Ejecutar
```bash
cd backend && mvn spring-boot:run
cd frontend && npm install && npm start
```

## Análisis de calidad
```bash
cd frontend && npx ng lint
```
El repositorio se analiza en SonarQube Cloud (análisis automático).
