@echo off

SET projectdir=%CD%

REM Change to React project directory
cd %projectdir%\my-react-component

REM Install React dependencies

if not exist %projectdir%\my-react-component\node_modules (
    echo Installing React dependencies...
    call npm install
)

REM Build the React project
echo Building React project...
call npm run build

REM Copy the React build to PHP public directory
echo Copying React build to PHP project public directory...
xcopy /E /I /Y build\* ..\php-project\public\react\

REM Change to PHP project directory
cd %projectdir%\php-project

REM Launch PHP built-in server
echo Starting PHP server...
start php -S localhost:8010 -t public

REM Open the application in the default browser
echo Launching the application in the default browser...
start http://localhost:8010

cd  %projectdir%

echo Done!
pause
