## SecureChat: Encrypted Chat App with Password Management

**SecureChat** is a web application that combines secure chat functionalities with password management. It allows users to:

* Store passwords securely with encryption.
* Chat with other users with end-to-end encryption.

This project is designed to help you learn and explore various web development technologies:

* **Backend (Node.js):** Building a secure API for user authentication, password storage, and encrypted chat functionality.
* **Frontend (React):** Designing user interfaces for password management and chat with real-time updates.
* **Database:** Implementing a secure database (e.g., MongoDB) to store user data and encrypted messages.
* **Security:**  Learning about encryption techniques for password storage and message transmission.
* **Real-time Communication:** Exploring options like webSockets for real-time chat updates.

**Getting Started:**

1. **Prerequisites:** Node.js (v16 or later), npm or yarn package manager.
2. **Clone the repository:** `git clone git@github.com:msgewendim/Secure-Chat-App.git`
3. **Install dependencies:** `npm install` (or `yarn install`)
4. **Configure Database:** Update the database connection details in `index.js` (refer to MongoDB connection instructions).
5. **Start the development server:** `npm start` (or `yarn start`)
    * The application will be accessible at http://localhost:3000 by default.

**Project Structure:**

**API (Node.js):**

* `index.js`: Entry point for the server.
* `routes` folder: Contains route files for user authentication, password management (CRUD operations), and chat functionality (sending, receiving messages).
* `models` folder: Contains data models for users, passwords, and messages with encryption schemes.
* `utils` folder: Contains utility functions for password generation, encryption/decryption, and token management.

**Client (React):**

* `src` folder: Main source code directory for React components.
    * `components` folder: Contains reusable components for login, password management (add, edit, view), chat interface (message list, send message), etc.
    * `App.js`: Main application component that renders the overall layout and handles routing.
* `services` folder: Contains functions for interacting with the API (user authentication, password management, sending/receiving messages).
* `main.js`: Entry point for the client-side application.

**Features:**

* Secure user authentication with JWT tokens.
* Encrypted password storage using industry-standard algorithms (e.g., bcrypt).
* User-friendly interface for managing passwords and chat conversations.
* Real-time chat updates with webSockets (optional).

**Future Enhancements:**

* Implement additional password management features (e.g., password categories, notes).
* Group chat functionality.
* File sharing with encryption.
* Mobile app development for iOS and Android.

**License:**

This project is distributed under the MIT License (refer to LICENSE file for details).

**Contributing:**

Feel free to fork the repository and contribute by adding new features or fixing bugs.  Please create pull requests for any changes.
