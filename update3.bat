call ./bersih.bat

xcopy D:\xampp3\htdocs\proto\toko\toko_01\server\js\*.* . /s /i /y
xcopy D:\xampp3\htdocs\proto\toko\toko_01\server\*.json . /y

del public\*.log

pause