echo COPY ADMIN
xcopy ..\..\..\client\web\css\*.* admin\css /s /i /y
xcopy ..\..\..\client\web\js\*.* admin\js /i /y
xcopy ..\..\..\client\web\*.* admin /i /y