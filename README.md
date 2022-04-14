# Simple JWT Authentication and Authorization for Login Feature

## Routes
```javascript
GET / 
GET /login 
GET /logout 
POST /login
```

## Algorithms
- When user do login, system created an JSON Web Token and put it in browser's cookie for amount of time
- There's a payload with uid or unique identifier to make sure the Token is always unique