# Error handling
Trong error handling  có 2 loại handler 

# Request handler
Nhận request từ client và trả về response.
Với mỗi request handler thì chúng ta sẽ có 3 tham số là`req`,`res`,`next`

nếu không dùng `next` thì không cần hai báo cũng được

```ts
app.get('',(req,res,next)=>{
  res.send("hello")
})
gọi next() để chuyển request sang request handler tiếp theo
gọi next(err) để chuyển request sang error handler 

khi xảy ra lỗi trong synchronous handler thì tự động sẽ được chuyển sang error handler

khi xảy ra lỗi trong asynchrnous handler thì phải gọi `next(err)` để chuyển sang error handler

# Error handler 
Nhận error từ request handler và trả về response
với mỗi error handler thì chugns ta bắt buộc phải hai bảo đủ có 4 tham số là err,req,res,next