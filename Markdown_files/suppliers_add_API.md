## Dashboard
```
POST /v1/suppliers
```
### Request Headers
```
Content-Type : application/json
```
<!-- (Input 1 for adding new suppliers) -->

### Request Body
```
{
    "Supplier Name": "String",
    "Mobile No": Number,
    "Comapany Name": "String"
}
```
### Response
```
200 - Success
Return Message "Added Details Successfully"

400 - Bad Request - Invalid Input(s)
403 - Forbidden
404 - Not Found
500 - Internal Server Error
```