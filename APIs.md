## Register User:

```javascript
    Method: POST
    URL: `http://localhost:3000/api/users`

    Request-body:
        {
            "fullName":"Your Name",
            "email": "example@example.com",
            "password": "passw0rd",
        }
```

## Login:

```javascript
    Method: POST
    URL: `http://localhost:3000/api/users/login`

    Request-body:
    {
    "username":"admin@gmail.com",
    "password": "123456"
    }
```

## Logout:

```javascript
    Method: POST
    URL: http://localhost:3000/api/users/logout
```

## allOrders:

```javascript
    Method: GET
    URL: `http://localhost:3000/api/order`

```

## allCategories:

```javascript
    Method: GET
    URL: "http://localhost:3000/api/categories"
```

## all Menu Items:

```javascript
    Method: POST
    URL: http://localhost:3000/api/menu-items
```
