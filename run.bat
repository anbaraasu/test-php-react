@echo off

SET projectdir=%CD%

REM Change to React project directory
cd %projectdir%\react-monaco-editor

REM Install React dependencies

if not exist %projectdir%\react-monaco-editor\node_modules (
    echo Installing React dependencies...
    call npm cache clean --force
    call npm install
    call npm run build --workspace vscode-ws-jsonrpc

    if %errorlevel% neq 0 goto finalline
    call npm run build --workspace client
)else (
    REM check any command line parameters are passed 
    echo Building React projects...
    if "%1" == "update" (    
        echo React dependencies already installed, so trying to update....
        call npm update 

        REM Build the React project
        
        call npm run build --workspace vscode-ws-jsonrpc

        if %errorlevel% neq 0 goto finalline
        call npm run build --workspace client
    )
)

if "%1" == "all" (        
    call npm run build --workspace vscode-ws-jsonrpc

    if %errorlevel% neq 0 goto finalline
    call npm run build --workspace client
)

if %errorlevel% neq 0 goto finalline
call npm run build --workspace my-monaco-editor
if %errorlevel% neq 0 goto finalline
REM remove numbers in file names in build folder


REM Copy the React build to PHP public directory
echo Copying React build to PHP project public directory...
rmdir /S /Q ..\php-project\public\static
REM xcopy /E /I /Y my-monaco-editor\build\static\* ..\php-project\public\static

xcopy /E /I /Y my-monaco-editor\dist\* ..\php-project\public\dist

REM Change to PHP project directory
cd %projectdir%\php-project

REM Launch PHP built-in server
echo Starting PHP server...
tasklist /FI "IMAGENAME eq cmd.exe" /FO TABLE /NH /V 2>NUL | find /I /N "nodemon"  >NUL


if errorlevel 1 (
    start nodemon --watch public --ext php --exec "php -S localhost:8010 -t public"
) else (
    echo "Nodemon is already running"
)
REM Open the application in the default browser
echo Launching the application in the default browser...

tasklist /FI "IMAGENAME eq chrome.exe" /FO TABLE /NH /V 2>NUL | find /I /N "http://localhost:8010" >NUL
if errorlevel 1 (
    tasklist /FI "IMAGENAME eq msedge.exe" /FO TABLE /NH /V 2>NUL | find /I /N "React in PHP" >NUL
    if errorlevel 1 (
        start http://localhost:8010
    ) else (
        echo "http://localhost:8010 is already launched"
    )
) else (
    echo "http://localhost:8010 is already launched"
)



echo Done!
:finalline
cd  %projectdir%
pause

REM Step2: Separting React Component - Next version - not working

REM Get-ChildItem -Path .\monaco-language-java\ -Recurse | Where-Object { $_.FullName -notmatch 'dist' -and $_.FullName -notmatch 'lib' -and  $_.FullName -notmatch 'build' -and $_.FullName -notmatch 'node_modules' -and  $_.FullName -notmatch '.vscode' -and $_.FullName -notmatch '.git' } | Compress-Archive -DestinationPath monaco-language-java.zip