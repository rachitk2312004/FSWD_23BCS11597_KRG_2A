# AI-Powered Resume & Portfolio Builder

A fullstack application that helps users create professional resumes and portfolios using AI-powered features. Built with React.js, Spring Boot, and PostgreSQL.

## 🚀 Features

### Module 1: Core Platform & Authentication (Current)
- **Landing Page**: Attractive, responsive design with call-to-action
- **Authentication**: 
  - Chat-based signup/login flow
  - Traditional email/password authentication
  - JWT with refresh tokens and secure cookies
- **Dashboard**: 
  - List and manage resumes and portfolios
  - Create, duplicate, delete, and share functionality
  - Status tracking (Completed, In-progress)
  - Privacy controls (Public/Private)
- **Auto-save**: Periodic auto-save with progress resumption
- **User Settings**: Profile management and privacy controls
- **Public Sharing**: Share resumes and portfolios via public links

### Future Modules (Planned)
- AI-powered content generation
- Resume parsing and optimization
- Advanced templates and themes
- Collaboration features
- Analytics and insights

## 🛠 Tech Stack

### Frontend
- **React.js** 18.2.0
- **Tailwind CSS** 3.2.7
- **React Router** 6.8.1
- **Axios** 1.3.4
- **React Hot Toast** 2.4.0
- **Lucide React** 0.263.1

### Backend
- **Spring Boot** 3.2.0
- **Spring Security** with JWT
- **Spring Data JPA**
- **PostgreSQL** Database
- **Maven** for dependency management

### Database
- **PostgreSQL** 13+
- Tables: users, resumes, portfolios
- JWT-based authentication
- Auto-save functionality

## 📁 Project Structure

```
ai-resume-portfolio-builder/
├── backend/                 # Spring Boot API
│   ├── src/main/java/com/resumebuilder/
│   │   ├── config/         # Configuration classes
│   │   ├── controller/     # REST controllers
│   │   ├── dto/           # Data Transfer Objects
│   │   ├── entity/        # JPA entities
│   │   ├── repository/    # Data repositories
│   │   ├── security/      # Security configuration
│   │   └── service/       # Business logic
│   ├── src/main/resources/
│   │   └── application.yml # Application configuration
│   └── pom.xml            # Maven dependencies
├── frontend/               # React.js application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── contexts/      # React contexts
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   └── App.js         # Main app component
│   ├── package.json       # NPM dependencies
│   └── tailwind.config.js # Tailwind configuration
├── database/               # Database scripts
│   └── setup.sql          # Database setup script
└── README.md              # This file
```

## 🚀 Getting Started

### Prerequisites
- Java 17+
- Node.js 16+
- PostgreSQL 13+
- Maven 3.6+

### Database Setup

1. **Install PostgreSQL** and create a database:
```sql
CREATE DATABASE resume_builder;
```

2. **Run the setup script**:
```bash
psql -U postgres -d resume_builder -f database/setup.sql
```

3. **Update database credentials** in `backend/src/main/resources/application.yml`:
```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/resume_builder
    username: your_username
    password: your_password
```

### Backend Setup

1. **Navigate to backend directory**:
```bash
cd backend
```

2. **Install dependencies**:
```bash
mvn clean install
```

3. **Run the application**:
```bash
mvn spring-boot:run
```

The API will be available at `http://localhost:8080`

### Frontend Setup

1. **Navigate to frontend directory**:
```bash
cd frontend
```

2. **Install dependencies**:
```bash
npm install
```

3. **Start the development server**:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the frontend directory:
```env
REACT_APP_API_URL=http://localhost:8080/api
```

### JWT Configuration

Update JWT settings in `backend/src/main/resources/application.yml`:
```yaml
jwt:
  secret: your-secret-key-here
  expiration: 86400000  # 24 hours
  refresh-expiration: 604800000  # 7 days
```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/chat-login` - Chat-based login
- `POST /api/auth/refresh` - Refresh JWT token

### User Management
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile
- `POST /api/user/change-password` - Change password

### Resume Management
- `GET /api/resumes` - Get user's resumes
- `GET /api/resumes/{id}` - Get specific resume
- `POST /api/resumes` - Create new resume
- `PUT /api/resumes/{id}` - Update resume
- `POST /api/resumes/{id}/duplicate` - Duplicate resume
- `DELETE /api/resumes/{id}` - Delete resume
- `GET /api/resumes/public/{publicLink}` - Get public resume

### Portfolio Management
- `GET /api/portfolios` - Get user's portfolios
- `GET /api/portfolios/{id}` - Get specific portfolio
- `POST /api/portfolios` - Create new portfolio
- `PUT /api/portfolios/{id}` - Update portfolio
- `POST /api/portfolios/{id}/duplicate` - Duplicate portfolio
- `DELETE /api/portfolios/{id}` - Delete portfolio
- `GET /api/portfolios/public/{publicLink}` - Get public portfolio

## 🎨 Features Overview

### Landing Page
- Responsive design with Tailwind CSS
- Call-to-action buttons
- Feature highlights
- Testimonials section
- Chat demo modal

### Authentication
- **Email/Password**: Traditional form-based authentication
- **Chat-based**: Interactive chat interface for login
- **JWT Security**: Stateless authentication with refresh tokens
- **Form Validation**: Client and server-side validation

### Dashboard
- **Resume Management**: Create, edit, duplicate, delete resumes
- **Portfolio Management**: Create, edit, duplicate, delete portfolios
- **Status Tracking**: Visual indicators for completion status
- **Privacy Controls**: Toggle public/private visibility
- **Auto-save**: Automatic saving with visual feedback

### Resume/Portfolio Builder
- **Rich Editor**: JSON-based content editing
- **Live Preview**: Real-time preview of changes
- **Auto-save**: Automatic saving every 2 seconds
- **AI Assistant**: Placeholder for future AI features
- **Export Options**: Download and share functionality

### Settings
- **Profile Management**: Update name, email, preferences
- **Security**: Change password functionality
- **Notifications**: Configure notification preferences
- **Privacy**: Data usage and security information

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: BCrypt password encryption
- **CORS Configuration**: Proper cross-origin resource sharing
- **Input Validation**: Server-side validation for all inputs
- **SQL Injection Protection**: JPA/Hibernate ORM protection
- **XSS Protection**: React's built-in XSS protection

## 🚀 Deployment

### Backend Deployment
1. Build the JAR file:
```bash
mvn clean package
```

2. Run the JAR:
```bash
java -jar target/ai-resume-portfolio-builder-0.0.1-SNAPSHOT.jar
```

### Frontend Deployment
1. Build the production bundle:
```bash
npm run build
```

2. Serve the build folder with a web server (nginx, Apache, etc.)

### Database Deployment
- Use managed PostgreSQL service (AWS RDS, Google Cloud SQL, etc.)
- Update connection strings in production configuration
- Run database migrations as needed

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Contact the development team

## 🔮 Roadmap

### Phase 1 (Current)
- ✅ Core platform and authentication
- ✅ Basic resume and portfolio management
- ✅ Auto-save functionality
- ✅ Public sharing

### Phase 2 (Planned)
- 🔄 AI-powered content generation
- 🔄 Resume parsing and optimization
- 🔄 Advanced templates
- 🔄 PDF export functionality

### Phase 3 (Future)
- 📋 Collaboration features
- 📋 Analytics and insights
- 📋 Mobile application
- 📋 Advanced AI features

---

**Note**: This is Module 1 of the AI-powered Resume & Portfolio Builder. The foundation is now complete with user authentication, basic CRUD operations, and a modern UI. Future modules will add AI-powered features for content generation and optimization.
