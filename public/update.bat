del css\*.* /s /q
del gambar\*.* /s /q
del js\*.* /s /q
del admin\*.* /s /q

rd css /s /q
rd gambar /s /q
rd js /s /q
rd admin /s /q

xcopy ..\..\..\..\toko\web\*.* . /s /i /y
xcopy ..\..\..\client\web\*.*  . /s /i /y

pause