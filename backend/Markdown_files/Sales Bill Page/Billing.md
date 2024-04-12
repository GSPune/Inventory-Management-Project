## Bill

POST /v1/billing

### Request Headers

Content-Type : application/json

### Request Body
```
{
    "Date":"String",
    "Customer_Name":"String",   
    "Input_Products":
[
    {
        "Product_Name":"String",      
        "Quantity":Number
    }
]
    
}
```
### Response
```
200 - OK,Success
201 - Created
Body
{
    "Customer_Name":"String",
    "Mobile No": Number,
    "Bill_No":Number,
    "Date":"String",
    "Bought_Products":[
    {
        "Product_name":"String", 
        "Product_id":Number,
        "Quantity":Number,
        "Price":Number,  
        "Net_Amount":Number }
    ] 
}
400 - Bad Request - Incorrect Input
403 - Forbidden
404 - Not Found
500 - Internal Server Error
```
