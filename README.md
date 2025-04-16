# ME Blog Application

## Summary of Application
This project is a backend application that supports a small frontend blog. The backend provides APIs for adding, retrieving, editing, and deleting blog posts. The application is designed with accessibility, SEO, and security in mind. It also includes tracking functionality while respecting user privacy and GDPR compliance.

---

## How to Run
1. Clone the repository to your local machine.
2. Install dependencies using `npm install`.
3. Create a `.env` file and configure the following variables:
   - `MONGODB_URI`: Your MongoDB connection string.
   - `PORT`: The port on which the server will run (default is 5000).
4. Start the server using `npm start`.
5. Open the frontend application and interact with the blog.

---

## Accessibility and SEO
The application is accessible because:
- Semantic HTML tags such as `<header>`, `<section>`, and `<main>` are used appropriately.
- Headings (`<h1>`, `<h2>`) are used in a logical order to improve screen reader navigation.
- Text contrast has been tested to ensure readability for users with visual impairments.
- The application includes meta tags for SEO, such as `<meta name="description">` and `<title>`.

---

## Tracking
The application uses Google Analytics for frontend tracking. It tracks specific events, such as "read_post", to understand user interactions. No personal user data is collected, ensuring compliance with GDPR and respecting user privacy.

---

## Security
The application mitigates common threats and vulnerabilities:
1. **Cross-Site Scripting (XSS)**:
   - User inputs are sanitized to prevent malicious scripts from being executed.
   - EJS templates escape output by default to avoid injecting harmful scripts.
2. **SQL Injection**:
   - The application uses Mongoose, which prevents SQL injection by parameterizing queries.
3. **Mitigation Example**:
   - To prevent XSS, all user inputs are validated and sanitized using libraries like `express-validator`. For example, blog post titles and content are checked for invalid characters before being stored in the database.

---

## Performance Optimization
Performance was optimized by:
- Using MongoDB indexes to speed up database queries.
- Serving static files (CSS, JS) through `express.static` to reduce server load.

---

## API Endpoints
The backend provides the following endpoints:
1. **GET /dashboard**: Retrieve all blog posts.
2. **POST /add-post**: Add a new blog post.
3. **PUT /edit-post/:id**: Edit an existing blog post.
4. **DELETE /delete-post/:id**: Delete a blog post.

The API responds with appropriate HTTP status codes: 401, 201, 409, 500.

---

## Common Threats and Mitigations
### Threats and Vulnerabilities

1. **Hardcoded Sensitive Information**:
   - Threat: Hardcoding sensitive information, such as database credentials or JWT secrets, directly into the source code can lead to security vulnerabilities if the code is exposed.
   - Mitigation: This project uses a `.env` file to store sensitive information like `MONGODB_URI` and `JWT_SECRET`. The `.env` file is excluded from version control using `.gitignore`, ensuring that sensitive data is not accidentally exposed in public repositories.

2. **Man-in-the-Middle Attacks**:
   - Threat: If sensitive information is transmitted over an insecure connection, it can be intercepted by attackers.
   - Mitigation: The database connection string (`MONGODB_URI`) uses `mongodb+srv`, which enforces encrypted communication (TLS/SSL) between the application and the database, reducing the risk of interception.
3. **Cross-Site Scripting (XSS)**:
   - Mitigation: All user inputs are sanitized, and EJS templates escape output by default.
4. **SQL Injection**:
   - Mitigation: Mongoose ORM is used to parameterize queries, preventing injection attacks.

---

## License
This project is for educational purposes and does not include a license.