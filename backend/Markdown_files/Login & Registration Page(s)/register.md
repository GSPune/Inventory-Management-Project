## Sign Up
<!-- Test change -->
```
POST /v1/signup
```
### Request Headers
```
Content-Type : application/json
```
### Request Body
```
{
    "Username": "String",
    "Password": "String",
    "Confirm_Password":"String",
    "Email":"String"
}
```
<!-- Redirect to ("/") -->
### Response
```
200 - Success

400 - Bad Request - Invalid Email/Password
403 - Forbidden
404 - Not Found
500 - Internal Server Error
```