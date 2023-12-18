# Backend Assessment for Meme Application

## Setting up the Backend

1. **Clone Repository**: Begin by cloning the backend repository to your local machine.
2. **Create a New Branch**: Create a new branch with the name `firstname-lastname` to work on your project.
3. **Node.js Project**: Set up a new Node.js project for the backend.
4. **Install Dependencies**: Install the required dependencies.
5. **Create database**: Create a new database for the project using MongoDB Atlas.

## Instructions

Develop the backend for the meme application to handle user registration, meme creation, meme retrieval, meme updating, and meme deletion.

## Requirements

1. **User Registration**:

   - Create APIs for user registration and login.
   - Use bcrypt for password hashing.

2. **Meme Data Model**:

   - Create a Meme schema using Mongoose for storing meme data.
   - The schema should include fields for image URLs, text captions, and user references (for the meme creator).
   - All fields should be required.
   - Set timestamps for the schema.

3. **Meme Creation API**:

   - Create an API endpoint for adding new memes.
   - Implement image URL and text caption upload functionality.
   - Save the created memes to the database, associating them with the logged-in user.

4. **Meme Retrieval API**:

   - Create API endpoints to retrieve memes:
     - Retrieve all memes.
     - Retrieve a single meme by its ID.

5. **Meme Update API**:

   - Create an API endpoint for updating memes.
   - Allow users to update image URLs and text captions of their memes.
   - Ensure that only the meme creator can update their memes.

6. **Meme Deletion API**:

   - Create an API endpoint for deleting memes.
   - Allow users to delete their own memes.
   - Ensure that only the meme creator can delete their memes.

7. **User Roles and Permissions**:

   - Differentiate between regular users and registered meme creators.

## Submission

- After implementing the project, stage your changes, commit them, and push to your branch.
