# 🧗‍♂️ Climbbergs - Custom Hangboard Designer

> A full-stack web application for designing custom climbing hangboards with an interactive drag-and-drop interface.

[![.NET](https://img.shields.io/badge/.NET-9.0-512BD4?logo=dotnet)](https://dotnet.microsoft.com/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react)](https://reactjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql)](https://www.postgresql.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)

[Live Demo](#) | [Features](#-features) | [Tech Stack](#-tech-stack) | [Getting Started](#-getting-started)

---

## 📸 Screenshots

### Hangboard Designer
![Designer Interface](docs/screenshots/designer.png)
*Interactive canvas with drag-and-drop grip placement*

### Grip Customization
![Grip Controls](docs/screenshots/controls.png)
*Adjustable depth and angle for different grip types*

### Gallery
![Community Gallery](docs/screenshots/gallery.png)
*Browse designs from the climbing community*

---

## ✨ Features

### 🎨 Interactive Designer
- **Drag-and-Drop Canvas** - Built with Fabric.js for smooth interactions
- **6 Grip Types** - Jug, Crimp, Sloper, Pocket, Pinch, Edge
- **Customizable Properties**
    - Adjustable depth (5-40mm) for crimps and pockets
    - Adjustable angle (0-90°) for slopers
- **Visual Feedback** - Real-time grip count and color-coded types
- **Resize & Rotate** - Full control over grip placement

### 💾 Design Management
- **Session-Based Saving** - Designs persist across sessions
- **Contact Form** - Request quotes with email integration
- **My Designs** - View and manage your saved designs
- **Gallery** - Browse community designs for inspiration

### 🛍️ E-Commerce Integration
- **Product Catalog** - Browse climbing gear and accessories
- **Interest Tracking** - Track user interest in products
- **Product Details** - Full product information with images

### 🏗️ Technical Features
- **Clean Architecture** - Separation of concerns (Core, Application, Infrastructure, API)
- **Repository Pattern** - Abstracted data access layer
- **RESTful API** - Well-structured endpoints with Swagger documentation
- **Responsive Design** - Mobile-friendly interface
- **Real-time Updates** - Dynamic price calculation

---

## 🛠️ Tech Stack

### Backend
- **Framework**: ASP.NET Core 9.0 (Web API)
- **Database**: PostgreSQL 16 (Docker)
- **ORM**: Entity Framework Core 9.0.12
- **Architecture**: Clean Architecture with Repository Pattern
- **API Documentation**: Swagger/OpenAPI

### Frontend
- **Framework**: React 18.3 with Vite
- **Routing**: React Router DOM 6.22
- **Styling**: Tailwind CSS 3.4
- **Canvas**: Fabric.js 5.3
- **HTTP Client**: Axios 1.6.7
- **State Management**: React Hooks (useState, useEffect, useRef)

### DevOps & Tools
- **IDE**: JetBrains Rider
- **Database Tool**: DataGrip
- **Version Control**: Git & GitHub
- **Container**: Docker (PostgreSQL)

---

## 🏛️ Architecture

### Project Structure
```
Climbbergs/
├── Climbbergs.Core/              # Domain entities & interfaces
│   ├── Entities/
│   │   ├── Product.cs
│   │   ├── HangboardDesign.cs
│   │   ├── GripType.cs
│   │   └── DesignGrip.cs
│   └── Interfaces/
│       ├── IRepository.cs
│       └── IHangboardDesignRepository.cs
│
├── Climbbergs.Application/       # Business logic & DTOs
│   ├── DTOs/
│   │   ├── HangboardDesignDto.cs
│   │   └── GripTypeDto.cs
│   └── Services/
│       ├── HangboardDesignService.cs
│       └── ProductService.cs
│
├── Climbbergs.Infrastructure/    # Data access & repositories
│   ├── Data/
│   │   └── ApplicationDbContext.cs
│   └── Repositories/
│       ├── HangboardDesignRepository.cs
│       └── ProductRepository.cs
│
├── Climbbergs.Api/               # API controllers & startup
│   ├── Controllers/
│   │   ├── HangboardDesignsController.cs
│   │   ├── GripTypesController.cs
│   │   └── ProductsController.cs
│   └── Program.cs
│
└── climbbergs-frontend/          # React SPA
    ├── src/
    │   ├── components/
    │   │   ├── HangboardCanvas.jsx
    │   │   ├── GripPalette.jsx
    │   │   └── ConfigPanel.jsx
    │   ├── pages/
    │   │   ├── HangboardBuilderPage.jsx
    │   │   ├── ShopPage.jsx
    │   │   └── GalleryPage.jsx
    │   └── services/
    │       └── api.js
    └── package.json
```

### Database Schema
```
┌─────────────────┐         ┌──────────────────┐
│ HangboardBases  │────┐    │   GripTypes      │
├─────────────────┤    │    ├──────────────────┤
│ Id (PK)         │    │    │ Id (PK)          │
│ Name            │    │    │ Name             │
│ Width           │    │    │ Description      │
│ Height          │    │    │ Color            │
│ Price           │    │    │ HasAngle         │
└─────────────────┘    │    │ HasDepth         │
                       │    │ MinDepth         │
                       │    │ MaxDepth         │
                       │    └──────────────────┘
                       │             │
                       │             │
                       ▼             ▼
            ┌──────────────────────────┐
            │   HangboardDesigns       │
            ├──────────────────────────┤
            │ Id (PK)                  │
            │ SessionId                │
            │ HangboardBaseId (FK)     │
            │ ConfigurationJson        │
            │ TotalPrice               │
            │ ContactEmail             │
            │ ContactName              │
            │ CreatedAt                │
            └──────────────────────────┘
                       │
                       │ 1:N
                       ▼
            ┌──────────────────────────┐
            │      DesignGrips         │
            ├──────────────────────────┤
            │ Id (PK)                  │
            │ HangboardDesignId (FK)   │
            │ GripTypeId (FK)          │
            │ PositionX                │
            │ PositionY                │
            │ Width                    │
            │ Height                   │
            │ Rotation                 │
            │ Angle (nullable)         │
            │ Depth (nullable)         │
            └──────────────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites
- [.NET 9 SDK](https://dotnet.microsoft.com/download)
- [Node.js 18+](https://nodejs.org/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Git](https://git-scm.com/)

### Installation

#### 1. Clone the repository
```bash
git clone https://github.com/yourusername/climbbergs.git
cd climbbergs
```

#### 2. Setup Database
```bash
# Start PostgreSQL in Docker
docker run --name climbbergs-postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=yourpassword \
  -e POSTGRES_DB=climbbergs_mvp \
  -p 5432:5432 \
  -d postgres:16
```

#### 3. Backend Setup
```bash
# Navigate to solution directory
cd Climbbergs

# Restore dependencies
dotnet restore

# Update connection string in Climbbergs.Api/appsettings.Development.json
# "DefaultConnection": "Host=localhost;Port=5432;Database=climbbergs_mvp;Username=postgres;Password=yourpassword"

# Run migrations
dotnet ef database update --project Climbbergs.Infrastructure --startup-project Climbbergs.Api

# Start backend
cd Climbbergs.Api
dotnet run
```

Backend will run on: **http://localhost:5177**

#### 4. Frontend Setup
```bash
# Navigate to frontend directory
cd climbbergs-frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will run on: **http://localhost:5173**

### 🧪 Testing the Application

1. **Open** http://localhost:5173
2. **Select a grip type** from the left panel (e.g., "Jug")
3. **Click on the canvas** to place grips
4. **Customize grip properties** using sliders (angle/depth)
5. **Save your design** with contact information
6. **View saved designs** in "My Designs"

---

## 📡 API Endpoints

### Hangboard Designer

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/hangboardbases` | Get all hangboard base options |
| `GET` | `/api/griptypes` | Get all available grip types |
| `GET` | `/api/hangboarddesigns/{id}` | Get specific design by ID |
| `GET` | `/api/hangboarddesigns/session/{sessionId}` | Get designs by session |
| `GET` | `/api/hangboarddesigns/recent?count=10` | Get recent designs for gallery |
| `POST` | `/api/hangboarddesigns` | Create new design |
| `PUT` | `/api/hangboarddesigns/{id}` | Update existing design |
| `DELETE` | `/api/hangboarddesigns/{id}` | Delete design |

### Products

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/products` | Get all products |
| `GET` | `/api/products/{id}` | Get product details |
| `POST` | `/api/productinterests` | Record product interest |

**Swagger Documentation**: http://localhost:5177/swagger

---

## 🎨 Design Decisions

### Why Fabric.js?
- **Performance** - Hardware-accelerated canvas rendering
- **Rich API** - Built-in support for object manipulation
- **Event System** - Easy event handling for drag, resize, rotate

### Why useRef for selectedGrip?
- **Closure Problem** - Event handlers in useEffect capture stale state
- **Solution** - useRef maintains current value across renders
- **Pattern** - Separate useEffect updates ref when prop changes

### Why Session-based Saving?
- **No Authentication Required** - Lower barrier to entry
- **Privacy** - No account creation needed
- **Persistence** - Designs saved across browser sessions

---

## 🔮 Future Enhancements

- [ ] **3D Preview** - Three.js visualization of hangboard
- [ ] **User Authentication** - Account system with saved designs
- [ ] **Email Notifications** - Quote confirmations
- [ ] **Export Options** - PDF/PNG export of designs
- [ ] **Admin Dashboard** - Manage designs and quotes
- [ ] **Payment Integration** - Stripe checkout
- [ ] **Design Templates** - Pre-made starter designs
- [ ] **Social Sharing** - Share designs on social media
- [ ] **Mobile App** - React Native version
- [ ] **AR Visualization** - See hangboard in your space

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow Clean Architecture principles
- Write unit tests for new features
- Update documentation as needed
- Use conventional commit messages

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Erik Söderberg**

- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Name](https://linkedin.com/in/yourprofile)

---

## 🙏 Acknowledgments

- **Anthropic Claude** - AI pair programming assistance
- **Fabric.js** - Canvas manipulation library
- **Tailwind CSS** - Utility-first CSS framework
- **React** - UI framework
- **.NET Community** - Clean Architecture resources

---

## 📊 Project Stats

![GitHub last commit](https://img.shields.io/github/last-commit/yourusername/climbbergs)
![GitHub code size](https://img.shields.io/github/languages/code-size/yourusername/climbbergs)
![GitHub top language](https://img.shields.io/github/languages/top/yourusername/climbbergs)

---

<div align="center">

**Built with ❤️ for the climbing community**

[⬆ Back to Top](#-climbbergs---custom-hangboard-designer)

</div>