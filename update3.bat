rem del node_modules\*.* /s /q
del module\*.* /s /q
del public\*.* /s /q
del view\*.* /s /q
del public\*.log
del *.log
del upload\*.* /s /q

rd public\admin /s /q
rd public /s /q
rd view /s /q
rd module /s /q
rd upload /s /q

rem exit

xcopy D:\xampp3\htdocs\proto\toko\toko_01\server\js\*.* . /s /i /y
xcopy D:\xampp3\htdocs\proto\toko\toko_01\server\*.json . /y

del public\*.log

pause