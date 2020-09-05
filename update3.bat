rem del node_modules\*.* /s /q
del module\*.* /s /q
del public\*.* /s /q
del view\*.* /s /q

rd public\admin /s /q

rem exit

xcopy D:\xampp3\htdocs\proto\toko\toko_01\server\js\*.* . /s /i /y
xcopy D:\xampp3\htdocs\proto\toko\toko_01\server\*.json . /y

pause