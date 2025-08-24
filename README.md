# 🚀 EventFuze – Fuse Connections, Ignite Campus Events

**EventFuze** is a full-stack web platform designed for **university clubs** to organize, manage, and promote campus events. It empowers students to discover and register for events, while enabling admins to seamlessly manage clubs, members, and event participation.

## ✨ Features

* 🔑 **Role-based access**
  * **Super Admin**: Create, edit, delete clubs, and manage all events.
  * **Admin**: Manage their club, create events, view participants, manage members.
  * **User (Student/Member)**: Join clubs, browse events, register for events, track participation.

* 📅 **Event Management**
  * Create, update, delete events.
  * Event registration & participant tracking.

* 🏛️ **Club Management**
  * Create, update, delete clubs.
  * Add/remove members, assign roles.
  * Track milestones and achievements.

* 🔐 **Authentication & Security**
  * User signup/signin with JWT-based authentication.
  * Forgot/reset password with email verification.
  * Role-based route protection.

* 📄 **Other Features**
  * FAQ Chatbot (optional).
  * Certificate upload for participants.
  * Smooth user dashboards for different roles.

## 🛠️ Tech Stack

* **Frontend**: React.js (role-based dashboards, event browsing & registration UI)
* **Backend**: Node.js + Express.js (RESTful API)
* **Database**: MongoDB (document-based storage for users, clubs, events, registrations)
* **Authentication**: JWT + bcrypt
* **Other Tools**: Nodemailer (password reset), Multer/Cloud for certificate uploads

## 👥 User Roles

### 🔹 Super Admin
* Create/Edit/Delete clubs.
* View all events under clubs.
* Manage admins and users.

### 🔹 Admin
* Create/Edit/Delete events under their club.
* View club participants and members.
* Manage club milestones.

### 🔹 Student / Club Member
* Join/Leave clubs.
* View club details and milestones.
* Register/Cancel event participation.

## ⚡ API Endpoints

### 🔑 Authentication

| Method | Endpoint                     | Description                            |
|--------|------------------------------|----------------------------------------|
| `POST` | `/signup`                    | Register a new user                    |
| `POST` | `/signin`                    | Login user                             |
| `GET`  | `/user-details`              | Get logged-in user details (protected) |
| `GET`  | `/userLogout`                | Logout user                            |
| `POST` | `/forgot-password`           | Send password reset email              |
| `POST` | `/reset-password`            | Reset password with token              |
| `GET`  | `/verify-reset-token/:token` | Verify password reset token            |

### 👥 User Management

| Method | Endpoint          | Description                |
|--------|-------------------|----------------------------|
| `GET`  | `/all-user`       | Get all users (admin only) |
| `POST` | `/user-search`    | Search users               |
| `POST` | `/update-user`    | Update user info           |
| `POST` | `/update-profile` | Update profile             |
| `POST` | `/delete-user`    | Delete user                |

### 🏛️ Club Management

| Method | Endpoint        | Description                     |
|--------|-----------------|---------------------------------|
| `GET`  | `/all-club`     | Get all clubs                   |
| `POST` | `/club-details` | Get club by ID                  |
| `POST` | `/create-club`  | Create a new club (super admin) |
| `POST` | `/update-club`  | Update club details             |
| `POST` | `/delete-club`  | Delete a club                   |

#### Milestones

| Method | Endpoint            | Description              |
|--------|---------------------|--------------------------|
| `POST` | `/get-milestones`   | Get milestones of a club |
| `POST` | `/add-milestone`    | Add milestone to a club  |
| `POST` | `/update-milestone` | Update milestone         |
| `POST` | `/delete-milestone` | Delete milestone         |

#### Members

| Method | Endpoint              | Description           |
|--------|-----------------------|-----------------------|
| `POST` | `/add-member`         | Add member to club    |
| `POST` | `/club-members`       | Get club members      |
| `POST` | `/remove-member`      | Remove club member    |
| `POST` | `/update-member-role` | Update member role    |
| `POST` | `/join-club`          | Student joins a club  |
| `POST` | `/leave-club`         | Student leaves a club |

### 📅 Events

| Method   | Endpoint        | Description                     |
|----------|----------------|---------------------------------|
| `POST`   | `/create-event` | Create a new event (admin only) |
| `GET`    | `/all-events`   | Get all events                  |
| `POST`   | `/update-event` | Update event details            |
| `DELETE` | `/delete-event` | Delete event                    |
| `POST`   | `/events/club`  | Get events by club              |

### 📝 Event Registration

| Method | Endpoint                    | Description                                     |
|--------|-----------------------------|-------------------------------------------------|
| `POST` | `/register-event`           | Register student for event                      |
| `POST` | `/cancel-registration`      | Cancel event registration                       |
| `POST` | `/registrations-by-event`   | Get participants by event                       |
| `POST` | `/registrations-by-student` | Get all student's registrations                 |
| `POST` | `/upload-certificate`       | Upload certificate for participant (admin only) |

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/SOMBIT4/EventFuze.git

```

### 2️⃣ Install Dependencies

#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd frontend
npm install
```

### 3️⃣ Setup Environment Variables

Create a `.env` file in your **server** folder:
## Backend

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```
##Frontnd
```env
REACT_APP_CLOUD_NAME_CLOUDINARY = dy*****

REACT_APP_BACKEND_URL = http://localhost:8080
```

### 4️⃣ Run the App

#### Start Backend
```bash
cd backend
npm run dev
```

#### Start Frontend
```bash
cd frontend
npm start
```

## 📌 Roadmap

- [ ] Push notifications for event reminders
- [ ] Analytics dashboard for admins
- [ ] AI-powered chatbot for FAQs
- [ ] Event feedback & ratings

## 🤝 Contributing

Contributions are welcome! Please fork the repo and submit a pull request.

