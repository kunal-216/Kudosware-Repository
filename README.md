# Job Portal Application

# Kudosware Assignment

## Description

The Job Portal Application is a web platform designed to streamline the job application process. It allows users to sign up, log in, and manage their profiles, including uploading and updating their resumes and profile images. The application features a user-friendly interface with essential components such as a navbar, header, and footer, and supports image and file management using Multer.

## Table of Contents

1. [Architecture and Functionality](#architecture-and-functionality)
2. [Features](#features)
3. [Pages](#pages)
4. [Components](#components)
5. [Installation](#installation)
6. [Technologies Used](#technologies-used)

## Architecture and Functionality

### Architecture

- **Frontend**: Built with React.js, this handles the user interface and user interactions.
- **Backend**: Powered by Node.js and Express.js, this manages server-side logic and API routes.
- **Database**: MongoDB is used for storing user data, including profile details, images, and resumes.

### Functionality

- **User Authentication**: Users can sign up and log in. On successful login, the user icon on the navbar updates to their profile image, and the sign-up button changes to a logout button.
- **Profile Management**: After logging in, users can view and update their profile details, including their resume. The profile page displays all user details except the password field, and provides a link to view and download the resume.
- **Image and File Management**: Profile images and resumes are managed using Multer. Files are stored on the server and can be accessed via URLs.

## Features

- Navbar with dynamic user icon and authentication status
- Header and footer components on all pages
- Home page with navbar, header, and footer
- Contact page with contact form and details
- Signup and login page with form fields for image, name, gender, email, password, bio, and resume
- Profile page showing user details and a link to view/download the resume

## Pages

1. **Home Page**: Contains the navbar, header, and footer. Provides general information and navigation to other parts of the application.
2. **Contact Page**: Features a contact form and contact details for user inquiries.
3. **Signup/Login Page**: Includes forms for user registration and login. Form fields include image, name, gender, email, password, bio, and resume.
4. **Profile Page**: Displays user details (excluding password) and provides a link to view/download the resume.

## Components

- **Navbar**: Contains navigation links and user authentication status.
- **Header**: Provides a title and introductory content for each page.
- **Footer**: Contains copyright information and additional navigation links.

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install frontend dependencies:
   ```bash
   cd client
   npm install
   ```

3. Install backend dependencies:
   ```bash
   cd ../server
   npm install
   ```

4. Set up environment variables in a `.env` file in the server directory. Include database connection string and any other necessary variables.

5. Start the backend server:
   ```bash
   cd server
   node server.js
   ```

6. Start the frontend development server:
   ```bash
   cd ../client
   npm start
   ```

## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **File Management**: Multer

## Accessing Images and Resumes

- **Profile Images**: Access via URL: `http://<frontend-deployed-link>/images/<filename>`
- **Resumes**: Access via URL: `http://<frontend-deployed-link>/resume/<filename>`
- The filenames here can be accessed from the database.

### And these files can be accessed from the image_uploads and resume_uploads in the backend repository.
