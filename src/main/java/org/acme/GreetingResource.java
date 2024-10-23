package org.acme; // Adjust this based on your package structure

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import java.util.List;

@Path("/hello")
public class GreetingResource {

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String hello() {
        return "Hello RESTEasy";
    }

    @Path("/personalized/{name}")
    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String personalizedHello(@PathParam("name") String name) {
        return "Hello " + name;
    }

    @POST
    @Path("/contact")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.TEXT_PLAIN)
    @Transactional
    public String createContactMessage(ContactMessage contactMessage) {
        // Validate input
        if (contactMessage.getEmail() == null || contactMessage.getEmail().isEmpty() ||
            contactMessage.getName() == null || contactMessage.getName().isEmpty() ||
            contactMessage.getLastName() == null || contactMessage.getLastName().isEmpty() || // Validate last name
            contactMessage.getPhone() == null || contactMessage.getPhone().isEmpty() || // Validate phone
            contactMessage.getMessage() == null || contactMessage.getMessage().isEmpty()) {
            throw new WebApplicationException("All fields are required.", 400);
        }
        // Persist the contact message
        contactMessage.persist();
        return "Contact message submitted successfully!";
    }

    @GET
    @Path("/users")
    @Produces(MediaType.APPLICATION_JSON)
    public List<UserName> getAllUsers() {
        return UserName.listAll();
    }

    @PATCH
    @Path("/personalized/{id}/{newName}")
    @Produces(MediaType.TEXT_PLAIN)
    @Transactional
    public String updateUserName(@PathParam("id") Long id, @PathParam("newName") String newName) {
        UserName user = UserName.findById(id);
        if (user == null) {
            throw new WebApplicationException("User not found!", 404);
        }
        user.name = newName;
        return "User's name updated to " + newName;
    }

    @DELETE
    @Path("/personalized/{id}")
    @Produces(MediaType.TEXT_PLAIN)
    @Transactional
    public String deleteUser(@PathParam("id") Long id) {
        boolean deleted = UserName.deleteById(id);
        if (deleted) {
            return "The user has been deleted successfully";
        } else {
            throw new WebApplicationException("User not found", 404);
        }
    }
}
