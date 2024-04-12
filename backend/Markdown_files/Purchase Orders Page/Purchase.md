## Purchase
```
POST /v2/purchases
```
### Request Headers
```
Content-Type : application/jsong
```
### Request Body
```
{
    "Date":"String",
    "Supplier_Name":"String",   
    "Input_Products":[
    {
        "Product_Names":"String",      
        "Quantity":Number,
        "Qty":Number }
    ]
}
```

### Response
```
200 - Success
Body
{
    "Supplier_Name":"String",
    "Mobile No": Number,
    "Comapany Name": "String"
    "Bill_No":Number,

    "Output_Products":[
    {
        "Sr_No":Number , 
        "Product_id":Number,
        "Quantity":Number,
        "Price":Number,  
        "Net_Amount":Number }
    ] 
    
}
400 - Bad Request - Incorrect input
403 - Forbidden
404 - Not Found
500 - Internal Server Error
```