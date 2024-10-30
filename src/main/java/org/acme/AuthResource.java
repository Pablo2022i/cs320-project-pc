package org.acme;

import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.mindrot.jbcrypt.BCrypt;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@Path("/auth")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class AuthResource {

    // Register a new user
    @POST
    @Path("/register")
    @Transactional
    public Response registerUser(User user) {
        // Check if the user already exists
        if (User.find("email", user.email).firstResult() != null) {
            return Response.status(Response.Status.CONFLICT)
                           .entity(Collections.singletonMap("message", "Email already exists"))
                           .build();
        }

        // Hash the password before saving
        user.password = hashPassword(user.password);
        user.isAdmin = false;  // Default to client, not admin
        user.persist();

        return Response.status(Response.Status.CREATED)
                       .entity(Collections.singletonMap("message", "Registration successful"))
                       .build();
    }

    // Login a user
    @POST
    @Path("/login")
    public Response loginUser(User loginUser) {
        // Find the user by email
        User user = User.find("email", loginUser.email).firstResult();

        // Check if user exists
        if (user == null) {
            return Response.status(Response.Status.UNAUTHORIZED)
                           .entity(Collections.singletonMap("message", "Account does not exist"))
                           .build();
        }

        // Check if password matches
        if (!BCrypt.checkpw(loginUser.password, user.password)) {
            return Response.status(Response.Status.UNAUTHORIZED)
                           .entity(Collections.singletonMap("message", "Invalid credentials"))
                           .build();
        }

        // Successful login, include isAdmin in the response
        Map<String, Object> responseBody = new HashMap<>();
        responseBody.put("message", "Login successful");
        responseBody.put("token", generateToken(user)); // Placeholder token
        responseBody.put("isAdmin", user.isAdmin);      // Include isAdmin status
        responseBody.put("user", user);                 // Include user details

        return Response.ok(responseBody).build();
    }

    // Helper method to hash passwords using BCrypt
    private String hashPassword(String password) {
        return BCrypt.hashpw(password, BCrypt.gensalt());
    }

    private String generateToken(User user) {
        return user.isAdmin ? "admin_token" : "user_token";
    }
}
