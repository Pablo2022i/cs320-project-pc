package org.acme;

import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;

@Path("/products")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ProductResource {

    // GET: Fetch all products from the database
    @GET
    public List<Product> getAllProducts() {
        // Fetch all products from the database using Panache's listAll() method
        return Product.listAll();
    }

    // POST: Create a new product in the database
    @POST
    @Transactional
    public Response createProduct(Product product) {
        // Persist the new product in the database
        product.persist();
        return Response.status(Response.Status.CREATED).entity(product).build();
    }

    // PATCH: Update an existing product in the database
    @PATCH
    @Path("/{id}")
    @Transactional
    public Response updateProduct(@PathParam("id") Long id, Product updatedProduct) {
        // Find the product by its ID
        Product product = Product.findById(id);
        if (product == null) {
            // If the product is not found, throw a 404 error
            throw new WebApplicationException("Product not found", 404);
        }
        // Update the product details
        product.name = updatedProduct.name;
        product.description = updatedProduct.description;
        product.price = updatedProduct.price;
        // Save the updated product and return the updated entity
        return Response.ok(product).build();
    }

    // DELETE: Remove a product by its ID from the database
    @DELETE
    @Path("/{id}")
    @Transactional
    public Response deleteProduct(@PathParam("id") Long id) {
        // Attempt to delete the product by its ID
        boolean deleted = Product.deleteById(id);
        if (!deleted) {
            // If the product is not found, throw a 404 error
            throw new WebApplicationException("Product not found", 404);
        }
        // Return no content (204) if the product was deleted successfully
        return Response.noContent().build();
    }
}
