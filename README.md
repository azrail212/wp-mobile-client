# WP Mobile Client

A **React Native (Expo)** mobile client for WordPress using a **custom REST API**.

This project demonstrates how to build a real mobile client for WordPress using:

- Expo Router
- JWT authentication
- A restricted backend API layer

---

## Features

- Expo Router (file‑based navigation)
- Tab‑based app navigation
- WordPress authentication via REST (JWT)
- Posts feed
- Post detail screen
- Clean API abstraction

---

## Architecture

### Mobile

- React Native + Expo
- Expo Router
- Secure token storage

### Backend

- Custom WordPress plugin
- `/bgh/v1` REST namespace
- JWT‑based authentication

Backend repo:
👉 https://github.com/azrail212/wp-mobile-client-plugin

---

## Project Structure

```
app/
components/
lib/
```

- `app/` – routing and screens
- `components/` – reusable UI
- `lib/` – API and business logic

---

## Getting Started

### Install dependencies

```bash
npm install
```

### Start the app

```bash
npx expo start
```

---

## Status

🚧 Work in progress  
This project is built incrementally to demonstrate clean architecture and learning‑friendly progression.
