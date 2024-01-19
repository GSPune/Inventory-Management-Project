## Purchase
```
GET/POST/API/A2/Purchase
```
### Request Headers
```
Content-Type : application/jsong
```
### Request Body
```
{   
    "Date":"String",    
    "Product_Name":"String",      
    "Quantity":Number,  
    "Supplier_Name":"String"
}
```

### Response
```
200 - Success
Body
{
"Sr_No":Number  
"Product_id":Number   
"Quantity":Number
"Price":Number   
"Net_Amount":Number
}
400 - Bad Request - Incorrect input
403 - Forbidden
404 - Not Found
500 - Internal Server Error
```