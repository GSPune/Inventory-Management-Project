## Cashier
<!-- Test change -->
```
POST /v1/cashiers
```
### Request Headers
```
Content-Type : application/json
```
### Request Body
```
{
    "Email_address": "String"
}
```
<!-- Notification message from client side -->
### Response
```
200 - Success

400 - Bad Request - Incorrect Email/Password
403 - Forbidden
404 - Not Found
500 - Internal Server Error
```
