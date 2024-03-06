## Dashboard
```
POST /v1/products/add
```
### Request Headers
```
Content-Type : application/json
```
<!-- (Input 1 for adding new product item) -->

### Request Body
```
    {
        "product_id" : Number,
        "product_name" : "String",
        "product_qty" : Number,
        "units" : "String",
        "category" : "String",
        "product_price" : Number,
        "expiry_date": "String"
    }
```
### Response
```
200 - Success
201 - Created
Return Message "Added Product Successfully"
400 - Bad Request - Invalid Input
403 - Forbidden
404 - Not Found
500 - Internal Server Error
```