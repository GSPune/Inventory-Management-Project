## Dashboard
```
POST /v1/
```
### Request Headers
```
Content-Type : application/json
```

### Request Body
```
<!-- (No inputs taken for this page...(static) stats and reports presented only) -->

```
### Response
```
200 - Success
[//]: #(Data to be extracted from the DB to generate summary!)
body
{
    "Sales": Number,
    "Expenses": Number,
    "Profits":Number,
    "Pie_Chart1_Data" :[
        {
            "Product Name":"String",
            "Contribution%" : Number
        }
        ]
    "Pie_Chart2_Data":[
        {
            "Stock_Alert_Type" : "String",
            "Amount" : Number
        }
    ]
    "ReducingSales_TableData":[
        {
            "Low_Sales" : boolean,
            "No_Sales" : boolean,
            "Category" : "String:,
            "product_no" : Number,
            "product_name" : "String",
            "product_qty" : Number
        }
    ]
}
400 - Bad Request - Incorrect Email/Password
403 - Forbidden
404 - Not Found
500 - Internal Server Error
```