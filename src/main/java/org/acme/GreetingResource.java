package org.acme;

import jakarta.transaction.Transactional;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.PATCH;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
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
    @Path("/submit-name")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.TEXT_PLAIN)
    @Transactional
    public Response submitName(Person person) {
        UserName userName = new UserName(person.getFirst(), person.getLast(), person.getPhone(), person.getEmail(), person.getMessage());
        userName.persist();
        return Response.ok("Hello " + person.getFirst() + "! Your information has been stored in the database.").build();
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
            return "User not found!";
        }
        user.first = newName;
        user.persist();
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
            return "User not found";
        }
    }

    public static class Person {
        private String first;
        private String last;
        private String phone; 
        private String email; 
        private String message; 

        public String getFirst() {
            return first;
        }
        public void setFirst(String first) {
            this.first = first;
        }
        public String getLast() {
            return last;
        }
        public void setLast(String last) {
            this.last = last;
        }
        public String getPhone() {
            return phone;
        }
        public void setPhone(String phone) {
            this.phone = phone;
        }
        public String getEmail() {
            return email;
        }
        public void setEmail(String email) {
            this.email = email;
        }
        public String getMessage() {
            return message;
        }
        public void setMessage(String message) {
            this.message = message;
        }
    }
}
