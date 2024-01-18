## Dashboard
```
POST /v1/products
```
### Request Headers
```
Content-Type : application/json
```
<!-- (Input 1 for adding new category) -->

### Request Body
```
{
    "Category": "String"
}
```
### Response
```
200 - Success
Return Message "Added Successfully"
400 - Bad Request - Invalid Input
403 - Forbidden
404 - Not Found
500 - Internal Server Error
```