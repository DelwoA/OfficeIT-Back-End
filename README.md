# OfficeIT Backend API

A Node.js/Express API built with TypeScript for OfficeIT's product management system.

## Features

- **Product Management**: CRUD operations for products
- **Category Management**: Product categorization system
- **Newsletter Subscription**: Email newsletter management with Brevo
- **Contact Form**: Email handling for contact inquiries
- **File Upload**: Image upload using Cloudinary
- **Authentication**: Admin authentication with Clerk
- **Database**: MongoDB with Mongoose ODM

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB (Mongoose)
- **Authentication**: Clerk
- **File Storage**: Cloudinary
- **Email**: Gmail SMTP + Brevo API

## API Endpoints

### Products

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Categories

- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create new category (Admin)
- `PUT /api/categories/:id` - Update category (Admin)
- `DELETE /api/categories/:id` - Delete category (Admin)

### Newsletter

- `POST /api/newsletter/subscribe` - Subscribe to newsletter

### Contact

- `POST /api/contact` - Send contact form

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/database-name

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Email Configuration
GMAIL_SENDER_EMAIL=your-email@gmail.com
GMAIL_APP_PASSWORD=your_gmail_app_password
EMAIL_RECEIVER=recipient@gmail.com

# Brevo Newsletter
BREVO_API_KEY=your_brevo_api_key
BREVO_LIST_ID=your_brevo_list_id

# Clerk Authentication
CLERK_PUBLISHABLE_KEY=pk_your_clerk_publishable_key
CLERK_SECRET_KEY=sk_your_clerk_secret_key
```

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Deployment to Vercel

This API is ready for Vercel deployment with the included `vercel.json` configuration.

### Steps to Deploy:

1. **Push to GitHub**: Ensure your code is in a GitHub repository

2. **Connect to Vercel**: Import your project in the Vercel dashboard

3. **Set Environment Variables**: In your Vercel project settings, add all required environment variables listed above

4. **Configure Build Settings**:

   - **Framework Preset**: Other
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. **Deploy**: Vercel will automatically build and deploy your API

### Build Configuration

- **Build Command**: `npm run build` (compiles TypeScript)
- **Output Directory**: `dist` (compiled JavaScript)
- **Node.js Runtime**: Automatic detection
- **Serverless Functions**: Configured via `vercel.json`

### Vercel Configuration

The `vercel.json` file configures:

- TypeScript compilation to serverless functions
- Route handling for all API endpoints
- 30-second timeout for database operations
- Production environment variables

### Database Considerations

- Use **MongoDB Atlas** for production database
- Ensure database allows connections from Vercel's IP ranges
- Configure proper connection pooling for serverless functions

### CORS Configuration

The API includes CORS middleware to handle cross-origin requests from your frontend application.

## Project Structure

```
src/
├── api/                 # API routes and middleware
│   ├── middleware/     # Custom middleware
│   ├── product.ts      # Product routes
│   ├── category.ts     # Category routes
│   ├── newsletter.ts   # Newsletter routes
│   └── contact.ts      # Contact routes
├── application/        # Business logic layer
├── domain/            # Domain models and DTOs
├── infrastructure/    # External services and database
└── index.ts          # Application entry point
```

## Error Handling

The API includes comprehensive error handling with:

- Global error middleware
- Custom error types (ValidationError, NotFoundError, etc.)
- Proper HTTP status codes
- Detailed error messages for development

## Security

- **Authentication**: Clerk middleware for admin routes
- **CORS**: Configured for frontend domain
- **Input Validation**: Zod schemas for request validation
- **Environment Variables**: Sensitive data stored securely
