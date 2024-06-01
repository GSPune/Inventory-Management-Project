## Bill

POST /v1/billing/new-bill/

### Request Headers

Content-Type : application/json

<!-- Json array of products -->
### Request Body
```
{
    "Customer_id":Number,   
    
    "Bought_Products":
    [
        {
            "Product_id":Number,      
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
    "Total": Number,
    "Bill_id":Number,
    "Date":"String",
    "Summary":[
    {
        "Product_Name":"String",
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
