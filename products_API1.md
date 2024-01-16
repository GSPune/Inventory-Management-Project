## Dashboard
```
POST /v1/products
```
### Request Headers
```
Content-Type : application/json
```
### Request Body
```
[]: #(Input 1 for selecting category)
{
    "Category": "String"
}
```
### Response
```
200 - Success
body
{
    "count" : Number,
    "results" : [
        {"product_no" : Number,
        "product_name" : "String",
        "product_qty" : Number,
        "product_price" : Number}
    ]
}
400 - Bad Request - Incorrect Email/Password
403 - Forbidden
404 - Not Found
500 - Internal Server Error
```