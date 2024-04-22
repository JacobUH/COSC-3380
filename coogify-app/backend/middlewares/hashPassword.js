import { hashPassword } from '../util/utilFunctions.js';

export default async function hashPasswordMiddleware(request, response, next) {
  try {
    // Check if the request method is POST and if JSON data exists
    if (
      request.method === 'POST' &&
      request.headers['content-type'] === 'application/json' &&
      request.body.password
    ) {
      const hashedPassword = await hashPassword(request.body.password); // Hash the password
      request.body.password = hashedPassword; // Update the password field with the hashed password
    }
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error('Error in hashPasswordMiddleware:', error);
    // Call the error handling middleware
    response.status(500).send('Internal Server Error');
  }
}
