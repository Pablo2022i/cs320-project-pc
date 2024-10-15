package org.acme;
import org.acme.UserName;

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

    //When we create a user and store in database (Postman trial)
    @POST
    @Path("/personalized/{name}")
    @Produces(MediaType.TEXT_PLAIN)
    @Transactional
    public String personalizedHelloPost(@PathParam("name") String name) {
        UserName userName = new UserName(name);
        userName.persist();
        return "Hello " + name + "! Your name has been stored in the database.";
    }

    @POST
    @Path("/personalized")
    @Consumes(MediaType.APPLICATION_JSON) // Had to add this annotation to expect JSON
    @Produces(MediaType.TEXT_PLAIN)
    public String personalizedHelloPost(Person p ) {
        return "Hello " + p.getFirst() + " " + p.getLast();
    }

    //To fetch all users from the database -- http://localhost:8080/hello/users
    @GET
    @Path("/users")
    @Produces(MediaType.APPLICATION_JSON)
    public List<UserName> getAllUsers() {
        return UserName.listAll();
    }

    //To update a user's name -- http://localhost:8080/hello/personalized/{id}/{new name}

    @PATCH
    @Path("/personalized/{id}/{newName}")
    @Produces(MediaType.TEXT_PLAIN)
    @Transactional
    public String updateUserName(@PathParam("id") Long id, @PathParam("newName") String newName) {
        UserName user = UserName.findById(id);
        if (user == null) {
            return "User not found!";
        }
        user.name = newName;
        return "User's name updated to " + newName;
    }

    //To remove a user from the database -- http://localhost:8080/hello/personalized/{id}
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

        public String getFirst() { return first; }
        public void setFirst(String first) { this.first = first; }
        public String getLast() { return last; }
        public void setLast(String last) { this.last = last; }
    }
}
