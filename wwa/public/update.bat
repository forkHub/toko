call bersih.bat

xcopy D:\xampp3\htdocs\proto\toko\toko\web\js\*.* .\js /s /i /y
xcopy D:\xampp3\htdocs\proto\toko\toko\web\css\*.* .\css /s /i /y
xcopy D:\xampp3\htdocs\proto\toko\toko\web\gambar\*.* .\gambar /s /i /y

del login.html
del admin.html
del login.html

copy 

pause