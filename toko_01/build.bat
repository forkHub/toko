del build\db\*.* /s /q
del build\public\*.* /s /q
del build\router\*.* /s /q

rd build\db /s /q
rd build\public /s /q
rd build\router /s /q

md build\public\admin

pause

call xcopy server\js\*.* build /s /y
call xcopy client\web\*.* build\public\admin /s /y

pause
pause