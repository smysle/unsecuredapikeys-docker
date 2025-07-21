# ----------------------------
# WebAPI multi-stage build
# ----------------------------

# Runtime image
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 8080

# Build image
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src

# Copy project files first for smarter layer caching
COPY ["UnsecuredAPIKeys.WebAPI/UnsecuredAPIKeys.WebAPI.csproj", "UnsecuredAPIKeys.WebAPI/"]
COPY ["UnsecuredAPIKeys.Data/UnsecuredAPIKeys.Data.csproj", "UnsecuredAPIKeys.Data/"]
COPY ["UnsecuredAPIKeys.Providers/UnsecuredAPIKeys.Providers.csproj", "UnsecuredAPIKeys.Providers/"]

# Restore NuGet packages
RUN dotnet restore "UnsecuredAPIKeys.WebAPI/UnsecuredAPIKeys.WebAPI.csproj"

# Copy the remaining source code
COPY . .

# Build
WORKDIR "/src/UnsecuredAPIKeys.WebAPI"
RUN dotnet build "UnsecuredAPIKeys.WebAPI.csproj" -c $BUILD_CONFIGURATION -o /app/build

# Publish
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "UnsecuredAPIKeys.WebAPI.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# Final runtime image
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "UnsecuredAPIKeys.WebAPI.dll"]