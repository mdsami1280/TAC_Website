# 🐳 Dockerfile Alternative (If Nixpacks Fails)

If Railway's Nixpacks builder continues to fail, you can use a Dockerfile instead.

## Create Dockerfile

Create a file named `Dockerfile` in the **root directory** with this content:

```dockerfile
# Use OpenJDK 17
FROM eclipse-temurin:17-jdk-alpine AS build

# Set working directory
WORKDIR /app

# Copy Maven wrapper and pom.xml
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Make mvnw executable
RUN chmod +x ./mvnw

# Download dependencies (this layer will be cached if pom.xml doesn't change)
RUN ./mvnw dependency:go-offline -B

# Copy source code
COPY src ./src

# Build the application
RUN ./mvnw clean package -DskipTests

# Runtime stage
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Copy the built JAR from build stage
COPY --from=build /app/target/*.jar app.jar

# Expose port
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
```

## Use Dockerfile in Railway

1. **In Railway Settings**:
   - Go to your service → Settings
   - Under "Build" section
   - Change "Builder" from "Nixpacks" to "Dockerfile"
   - Railway will automatically detect and use the Dockerfile

2. **Redeploy**:
   - Railway will build using Docker instead of Nixpacks
   - This is more reliable for complex builds

## Benefits of Dockerfile

- ✅ More control over the build process
- ✅ Consistent builds across environments
- ✅ Better caching of dependencies
- ✅ Explicit Java version (17)

---

**Note**: Only use this if Nixpacks continues to fail. The updated `railway.json` and `nixpacks.toml` should work first!

