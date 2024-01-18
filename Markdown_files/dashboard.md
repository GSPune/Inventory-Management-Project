## Dashboard
```
POST /v1/
```
### Request Headers
```
Content-Type : application/json
```
<!-- (No inputs taken for this page...(static) stats and reports presented only) -->
### Request Body
```


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
    "Pie_Chart1_Data" : []
}
400 - Bad Request - Incorrect Email/Password
403 - Forbidden
404 - Not Found
500 - Internal Server Error
```