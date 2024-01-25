## Dashboard
```
POST /v1/customers
```
### Request Headers
```
Content-Type : application/json
```
<!-- (Input 1 for adding new customers) -->

### Request Body
```
{

}
```
### Response
```
200 - Success

400 - Bad Request - Invalid Input(s)
403 - Forbidden
404 - Not Found
500 - Internal Server Error
```