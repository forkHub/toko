call bersih.bat

xcopy ..\..\..\..\toko\web\js\*.* .\js /s /i /y
xcopy ..\..\..\..\toko\web\css\*.* .\css /s /i /y
xcopy ..\..\..\..\toko\web\gambar\*.* .\gambar /s /i /y
xcopy ..\..\..\client\web\*.*  . /s /i /y

del login.html
del admin.html
del login.html

pause