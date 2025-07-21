# -----------------------------
# Scraper bot multi-stage build
# -----------------------------

# Runtime image
FROM mcr.microsoft.com/dotnet/runtime:9.0 AS base
WORKDIR /app

# Build image
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src

# Copy project files first for layer caching
COPY ["UnsecuredAPIKeys.Bots.Scraper/UnsecuredAPIKeys.Bots.Scraper.csproj", "UnsecuredAPIKeys.Bots.Scraper/"]
COPY ["UnsecuredAPIKeys.Data/UnsecuredAPIKeys.Data.csproj", "UnsecuredAPIKeys.Data/"]
COPY ["UnsecuredAPIKeys.Providers/UnsecuredAPIKeys.Providers.csproj", "UnsecuredAPIKeys.Providers/"]

# Restore NuGet
RUN dotnet restore "UnsecuredAPIKeys.Bots.Scraper/UnsecuredAPIKeys.Bots.Scraper.csproj"

# Copy source
COPY . .

# Build
WORKDIR "/src/UnsecuredAPIKeys.Bots.Scraper"
RUN dotnet build "UnsecuredAPIKeys.Bots.Scraper.csproj" -c $BUILD_CONFIGURATION -o /app/build

# Publish
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "UnsecuredAPIKeys.Bots.Scraper.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# Final runtime
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "UnsecuredAPIKeys.Bots.Scraper.dll"]