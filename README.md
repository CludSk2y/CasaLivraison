# 🚀 CasaLivraison - Fullstack Delivery Ecosystem

**CasaLivraison** is a high-performance food delivery platform. It features a scalable Node.js backend and a cross-platform mobile experience (In Development).

## 🏗️ System Architecture

### 🖥️ Backend (The Engine)
Built with a focus on data integrity and clear business logic.
* **Architecture:** MVC (Model-View-Controller) Pattern.
* **ORM:** Sequelize for complex relationships (Orders ↔ OrderItems ↔ Products).
* **Data Integrity:** Automated Migrations to track schema changes (e.g., adding dynamic delivery addresses).
* **Logic:** Custom utility for real-time total calculation based on dynamic cart items.

### 📱 Mobile (The Experience - Coming Soon)
The mobile client is designed for seamless user interaction.
* **Tech:** React Native / Expo (Planned).
* **Features:** Real-time Order Tracking, Restaurant Discovery, and Order History.

## 🛠️ Tech Stack Detailed
* **Runtime:** Node.js (Alpine optimized for Docker).
* **Framework:** Express.js with robust routing.
* **Database:** PostgreSQL (Containerized).
* **Containerization:** Docker & Docker Compose for zero-config environment setup.
* **Project Tracking:** Managed via Jira with specialized subtasks.

## ⚙️ Development Setup

### 1. Environment & Database
Spin up the entire stack including the PostgreSQL database:
```bash
docker-compose up -d
2. Database Synchronization
npx sequelize-cli db:migrate
📡 API Roadmap
[x] Authentication: JWT-based Login/Signup.

[x] Ordering System: Create & Link Order Items.

[ ] History API: Fetch user-specific order history.

[ ] Livreur Tracking: Real-time location updates.
