#Prueba técnica - Auronix Tech Internship Program 2026

API REST desarrollada en Typescript que consume la API Rick and Morty. Tiltra los personajes vivos y remplaza los espacios por guiones bajos en sus nombres.

Este proyecto fue desarrollado para la prueba técnica para "Auronix Tech Internship Program 2026" aplicando principios SOLID, arquitectura en capas y TDD.

#Carcateristicas
- Consumo de API REST sin uso de librerías cliente
- Filtrado de personajes por estado (solo vivos)
- Transformación de datos: remplazo de espacios porr guiones bajos en los personajes
- API REST porpia con Express para exponer los datos procesados
- Manejo automático de paginación (la API externa tiene +42 páginas)
- Test con Jest (14 pruebas unitarias + integración de api)
- Arquitectura en capas siguiendo los principios SOLID



#Requisitos previos
- Node.js >= 18.0.0
- npm >= 9.0.0



#Uso
- Modo desarrollo:
    npm run dev
- Modo Producción:
    npm run build
    npm start
- Ejecutar Tests:
    npm test



#API Endpoints
GET `/characters/ProcessedCharacters`

Request:
    curl http://localhost:3000/characters/ProcessedCharacters

Response exitosa (200):
```json
{
  "results": [
    {
      "id": 1,
      "name": "Rick_Sanchez",
      "status": "Alive",
      "gender": "Male"
    },
    {
      "id": 2,
      "name": "Morty_Smith",
      "status": "Alive",
      "gender": "Male"
    },
    {
      "id": 3,
      "name": "Summer_Smith",
      "status": "Alive",
      "gender": "Female"
    }
  ]
}
```

Response con error (500):
```json
{
  "error": "Error fetching characters"
}
```

Notas:
- La primera petición tarda algunos segundos debido a la paginación (42 páginas de la API externa)
- Se implementa un delay de 100ms entre páginas para evitar rate limiting
- Los nombres se transforman automáticamente: espacios -> guiones bajos



#Arquitectura del proyecto
El proyecto sigue una arquitectura en capas que separa responsabilidades y facilita testing y mantenimiento.

Cliente: Navegador/Postman/CURL

---HTTP Request-->

Controller (CharacterController.ts):
    - Recibe peticiones HTTP
    - Devuelve respuestas JSON
    - Manejo de errores HTTP

Service (CharacterService.ts):
    - Lógica
    - Filtrado de personajes vivos
    - Transformación de nombres

Repository (CharacterRepository):
    - Acceso a API externa
    - Manejo de paginación
    - rate limiting

---HTTP Request-->

API externa (https://rickandmortyapi.com/api/character)



#Principios y técnicas aplicados

Principio SOLID
 - las clases tienen una única responsabilidad
 - las interfaces permiten intercambiar implementaciones (ICharacterRepository, ICharacterService)
 - interfaces pequeñas y especificas 
 - las dependencias se inyectan a través de de interfaces

TDD
 - El proyecto fue desarrollado siguiendo TDD: tests escritos antes de código de producción



#Cobertura de tests
    - Repository: 7 casos (paginación, rate limiting, errores HTTP, casos edge)
    - Service: 3 casos (Filtrado, transformación, formato de respuesta)
    - Controller: 4 casos (Respuestas HTTP, manejo de errores, estructura JSON)
    - Integración: 1 caso (cobertura completa de funcionalidad)



#Tecnologías utilizadas
    - Node.js (>=18.0): Runtime de JavaScript
    - TypeScript (^5.0): Superset  tipado de JavaScript
    - Express (^4.18): Framework web para Node.js
    - Jest (^29.5): Framework de testing
    - ts-jest (^29.1): Preset de Jest para Typescript
    - supertest (^6.3): Testing de API HTTP



#Solución de problemas
    - Error: Cannot find Module
      Causa: Dependencias no instaladas
      Solución: 
        rm -rf node_modules package-lock.json
        npm install
    - Error: 429 (Rate Limit)
      Causa: demasiadas peticiones a la API
      Solución: el código ya maneja esto automáticamente con delays. Si persiste, esperar 1-2 minutos y reintentar:
        npm run dev
    - Problema: Tests fallan con timeout
      Causa: La API externa tarda en responder
      Solución: los tests tienen timeout de 30 segundos. Si falla, aumentar timeout en jest.config.js: testTimeout: 60000
    - Problema: Puerto 3000 ya en uso
      Causa: Otra aplicación usa el puerto 3000
      Solución: cambiar en puerto en src/server.ts: const PORT = 3001;  // o cualquier otro
    


#Proceso de desarrollo
1.- Setup inicial
2.- Definición de modelos (interfaces y tipos)
3.- TDD de Repository (Tests -> implementación)
4.- TDD de Service (Tests -> implementación)
5.- TDD de Controller (Tests -> implementación)
6.- Integración con Express (API REST)
7.- Tests de integración (end to end)
8.- Documentación (README)



#Autor
 - Karen Sosa Jácome
 - karensosajacome@gmail.com



#Licencia
 Este proyecto fue creado como prueba técnica de Auronix Tech Internship Program 2026
