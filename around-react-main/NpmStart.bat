@Echo off
title %0
echo ====[ Running script: %0 ]====
echo %~d0
echo %~dp0
echo.
%~d0
cd %~dp0
cd /d %~dp0
cd
echo.

Start cmd /c npm start

Exit
