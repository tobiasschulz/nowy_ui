#!/bin/bash

export SLN=Nowy.UI
export SLN_TEMP=${SLN}.TEMP

dotnet new sln --name ${SLN_TEMP}
dotnet sln ${SLN_TEMP}.sln add ../nukebuild/_build.csproj
dotnet sln ${SLN_TEMP}.sln add */*.csproj
mv ${SLN_TEMP}.sln ${SLN}.sln



export SLN=Nowy.UI.FULL
export SLN_TEMP=${SLN}.TEMP

dotnet new sln --name ${SLN_TEMP}
dotnet sln ${SLN_TEMP}.sln add ../nukebuild/_build.csproj
dotnet sln ${SLN_TEMP}.sln add */*.csproj
dotnet sln ${SLN_TEMP}.sln add ../../nowy_database/src/*/*.csproj
mv ${SLN_TEMP}.sln ${SLN}.sln


