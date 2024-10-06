# Wedding Dress Rental Frontend

A **React** frontend application for managing a Wedding Dress Rental service. This application allows users to browse dresses, make reservations, manage their profiles, and handle authentication.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Configuration](#environment-configuration)
- [Running the Application](#running-the-application)

## Features

- **User Authentication**: Registration, login, logout, and password management.
- **Dress Catalog**: Browse available wedding dresses with detailed information.
- **Reservations**: Users can reserve dresses for specific dates.
- **User Profile**: View and manage reservations and account settings.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Protected Routes**: Secure routes accessible only to authenticated users.
- **Loader Indicators**: Visual feedback during API requests.
- **Error Handling**: Comprehensive error messages and validations.

## Technologies Used

- **Frontend**:
  - React
  - TypeScript
  - Material-UI (MUI)
  - React Router
  - Axios
  - Day.js

- **State Management**:
  - React Context API

- **Other Tools**:
  - ESLint
  - Prettier

## Prerequisites

Ensure you have the following installed on your machine:

- **npm** or **Yarn**
- **Git**: Version control system

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Abd-Ulrahman-Aita/wedding-dress-rental-fe.git
cd wedding-dress-rental-fe
```

### 2. Install Dependencies

Using npm:

```bash
npm install
```

Or using Yarn:

```bash
yarn install
```

### 3. Environment Configuration

1. Create .env File

2. Configure Environment Variables

Open the .env file and set up your environment variables:

```bash
# Backend API URL
REACT_APP_API_URL=http://localhost:8000/api
```

- REACT_APP_API_URL: The base URL of your Laravel backend API.

### 4. Running the Application

1. Start the Development Server

Using npm:

```bash
npm start
```

Or using Yarn:

```bash
yarn start
```

The application will be available at http://localhost:3000.