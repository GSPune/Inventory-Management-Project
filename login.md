## Login
```
POST /v1/login
```
### Request Headers
```
Content-Type : application/json
```
### Request Body
```
{
    Username: "String",
    Password: "String"
}
```
### Response
```
200 - Success
301 - Moved Permantly
403 - Forbidden
404 - Not Found
500 - Internal Server Error
```