# Aarya Club Management System

A Spring Boot application for managing club members and events with admin authentication.

## Features

- Admin authentication with JWT tokens
- Member management (CRUD operations)
- Event management (CRUD operations)
- Role-based access control
- Secure password storage with BCrypt

## Database Configuration

### Option 1: MySQL Database (Production)

1. Make sure MySQL is running on localhost:3306
2. Create a database named `aarya`
3. Update `src/main/resources/application.properties` with your MySQL credentials
4. Run the application:
   ```bash
   mvn spring-boot:run
   ```

### Option 2: H2 In-Memory Database (Testing/Development)

1. Run the application with H2 profile:
   ```bash
   mvn spring-boot:run -Dspring.profiles.active=h2
   ```
2. Access H2 console at: http://localhost:8080/h2-console
   - JDBC URL: `jdbc:h2:mem:testdb`
   - Username: `sa`
   - Password: `password`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new admin
- `POST /api/auth/login` - Login as admin

### Members (Admin only)
- `GET /api/members` - Get all members
- `POST /api/members` - Create a new member
- `GET /api/members/{id}` - Get member by ID
- `PUT /api/members/{id}` - Update member
- `DELETE /api/members/{id}` - Delete member

### Events (Admin only)
- `GET /api/events` - Get all events
- `POST /api/events` - Create a new event
- `GET /api/events/{id}` - Get event by ID
- `PUT /api/events/{id}` - Update event
- `DELETE /api/events/{id}` - Delete event

## Usage

1. **Register an admin:**
   ```bash
   curl -X POST http://localhost:8080/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{
       "username": "admin",
       "password": "password",
       "email": "admin@example.com",
       "fullName": "Admin User"
     }'
   ```

2. **Login as admin:**
   ```bash
   curl -X POST http://localhost:8080/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{
       "username": "admin",
       "password": "password"
     }'
   ```

3. **Use the JWT token for protected endpoints:**
   ```bash
   curl -X GET http://localhost:8080/api/members \
     -H "Authorization: Bearer YOUR_JWT_TOKEN"
   ```

## Security

- All member and event operations require admin authentication
- JWT tokens are used for stateless authentication
- Passwords are encrypted using BCrypt
- CSRF protection is disabled for API endpoints
- H2 console access is allowed for development

## Troubleshooting

If you encounter database connection issues:

1. **For MySQL**: Ensure MySQL is running and the database exists
2. **For H2**: Use the H2 profile as shown above
3. Check the application logs for detailed error messages 