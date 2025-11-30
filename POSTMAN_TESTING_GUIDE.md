# Postman Testing Guide for Aarya Club Management API

## Setup Instructions

### 1. Import the Collection
1. Open Postman
2. Click "Import" button
3. Select the `Aarya_Club_API_Collection.json` file
4. The collection will be imported with all endpoints

### 2. Configure Environment Variables
1. In Postman, click on the collection name "Aarya Club Management API"
2. Go to the "Variables" tab
3. Set the following variables:
   - `base_url`: `http://localhost:8080`
   - `jwt_token`: Leave empty initially (will be filled after login)

## Testing Steps

### Step 1: Start the Application
```bash
# For H2 Database (Recommended for testing)
mvn spring-boot:run -Dspring.profiles.active=h2

# For MySQL Database
mvn spring-boot:run
```

### Step 2: Authentication Testing

#### 2.1 Register Admin
1. Open "Authentication" folder
2. Click "Register Admin"
3. The request body is pre-filled with:
   ```json
   {
       "username": "admin",
       "password": "password123",
       "email": "admin@aarya.com",
       "fullName": "Admin User"
   }
   ```
4. Click "Send"
5. **Expected Response**: 200 OK with JWT token
   ```json
   {
       "token": "eyJhbGciOiJIUzI1NiJ9...",
       "message": "Admin registered successfully"
   }
   ```

#### 2.2 Login Admin
1. Click "Login Admin"
2. The request body is pre-filled with:
   ```json
   {
       "username": "admin",
       "password": "password123"
   }
   ```
3. Click "Send"
4. **Expected Response**: 200 OK with JWT token
   ```json
   {
       "token": "eyJhbGciOiJIUzI1NiJ9...",
       "message": "Login successful"
   }
   ```

#### 2.3 Set JWT Token
1. Copy the token from the login response
2. Go to collection variables
3. Set `jwt_token` to the copied token value

### Step 3: Members Management Testing

#### 3.1 Get All Members
1. Open "Members Management" folder
2. Click "Get All Members"
3. Click "Send"
4. **Expected Response**: 200 OK with empty array `[]` (initially)

#### 3.2 Create Member
1. Click "Create Member"
2. The request body is pre-filled with:
   ```json
   {
       "name": "John Doe",
       "position": "President",
       "email": "john.doe@example.com",
       "imageUrl": "https://example.com/john.jpg",
       "description": "Club president with 5 years of experience",
       "active": true
   }
   ```
3. Click "Send"
4. **Expected Response**: 200 OK
   ```json
   "Member added successfully"
   ```

#### 3.3 Get Member by ID
1. Click "Get Member by ID"
2. Click "Send"
3. **Expected Response**: 200 OK with member details
   ```json
   {
       "id": 1,
       "name": "John Doe",
       "position": "President",
       "email": "john.doe@example.com",
       "imageUrl": "https://example.com/john.jpg",
       "description": "Club president with 5 years of experience",
       "active": true
   }
   ```

#### 3.4 Update Member
1. Click "Update Member"
2. The request body is pre-filled with updated data
3. Click "Send"
4. **Expected Response**: 200 OK
   ```json
   "Member updated successfully"
   ```

#### 3.5 Delete Member
1. Click "Delete Member"
2. Click "Send"
3. **Expected Response**: 200 OK
   ```json
   "Member removed successfully"
   ```

### Step 4: Events Management Testing

#### 4.1 Get All Events
1. Open "Events Management" folder
2. Click "Get All Events"
3. Click "Send"
4. **Expected Response**: 200 OK with empty array `[]` (initially)

#### 4.2 Create Event
1. Click "Create Event"
2. The request body is pre-filled with:
   ```json
   {
       "title": "Annual Club Meeting",
       "date": "2024-12-25",
       "description": "Annual general meeting of the club",
       "imageUrl": "https://example.com/meeting.jpg"
   }
   ```
3. Click "Send"
4. **Expected Response**: 200 OK
   ```json
   "add record"
   ```

#### 4.3 Get Event by ID
1. Click "Get Event by ID"
2. Click "Send"
3. **Expected Response**: 200 OK with event details
   ```json
   {
       "id": 1,
       "title": "Annual Club Meeting",
       "date": "2024-12-25",
       "description": "Annual general meeting of the club",
       "imageUrl": "https://example.com/meeting.jpg"
   }
   ```

#### 4.4 Update Event
1. Click "Update Event"
2. The request body is pre-filled with updated data
3. Click "Send"
4. **Expected Response**: 200 OK
   ```json
   "Record Updated"
   ```

#### 4.5 Delete Event
1. Click "Delete Event"
2. Click "Send"
3. **Expected Response**: 200 OK
   ```json
   "Record Deleted"
   ```

### Step 5: H2 Console Testing (Development Only)

#### 5.1 Access H2 Console
1. Open "H2 Console (Development)" folder
2. Click "Access H2 Console"
3. Click "Send"
4. **Expected Response**: 200 OK with H2 console HTML page

## Testing Scenarios

### Scenario 1: Unauthorized Access
1. Clear the `jwt_token` variable
2. Try to access any member or event endpoint
3. **Expected Response**: 401 Unauthorized

### Scenario 2: Invalid Token
1. Set `jwt_token` to an invalid value like "invalid-token"
2. Try to access any member or event endpoint
3. **Expected Response**: 401 Unauthorized

### Scenario 3: Duplicate Registration
1. Try to register the same admin again
2. **Expected Response**: 400 Bad Request
   ```json
   "Username already exists"
   ```

### Scenario 4: Invalid Login
1. Try to login with wrong credentials
2. **Expected Response**: 400 Bad Request
   ```json
   "Invalid username or password"
   ```

### Scenario 5: Member Validation
1. Try to create a member without required fields
2. **Expected Response**: 400 Bad Request with validation errors

## Expected HTTP Status Codes

- **200 OK**: Successful operations
- **201 Created**: Resource created successfully
- **400 Bad Request**: Invalid input data
- **401 Unauthorized**: Missing or invalid JWT token
- **403 Forbidden**: Insufficient permissions
- **404 Not Found**: Resource not found
- **500 Internal Server Error**: Server error

## Troubleshooting

### Common Issues

1. **Connection Refused**
   - Ensure the application is running
   - Check if the port 8080 is available

2. **401 Unauthorized**
   - Verify JWT token is set correctly
   - Check if token is expired
   - Ensure token format is "Bearer <token>"

3. **400 Bad Request**
   - Check request body format
   - Verify all required fields are present
   - Check email format validity

4. **404 Not Found**
   - Verify the endpoint URL is correct
   - Check if the resource ID exists

### Database Issues

1. **H2 Database**: Access http://localhost:8080/h2-console
   - JDBC URL: `jdbc:h2:mem:testdb`
   - Username: `sa`
   - Password: `password`

2. **MySQL Database**: Check MySQL connection
   - Ensure MySQL is running
   - Verify database `aarya` exists
   - Check credentials in `application.properties`

## Complete Test Flow

1. **Start Application** → H2 or MySQL
2. **Register Admin** → Get initial token
3. **Login Admin** → Get fresh token
4. **Set JWT Token** → In collection variables
5. **Test Members CRUD** → Create, Read, Update, Delete
6. **Test Events CRUD** → Create, Read, Update, Delete
7. **Test Error Scenarios** → Unauthorized, validation errors
8. **Verify Database** → Check H2 console or MySQL

This comprehensive testing will ensure all endpoints are working correctly with proper authentication and authorization. 