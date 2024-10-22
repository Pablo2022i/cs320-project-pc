package org.acme;  // Use your actual package here.

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/submit-name")  // Defines the API endpoint at '/submit-name'
public class SubmitNameResource {

    @POST
    @Consumes(MediaType.APPLICATION_JSON)  // This endpoint consumes JSON data
    public Response submitName(UserName userName) {
        // Validate the name field
        if (userName == null || userName.getName() == null || userName.getName().trim().isEmpty()) {
            // If name is null or empty, return BAD REQUEST (400) with error message
