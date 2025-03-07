# Shopify App Template (Powered by Firebase)

A simple template for top notch Shopify applications.

**Outstanding features:**

* **Pay as you go architecture with Firebase**
* **Shopify Polaris standard interface**
* **Built on React, React Router, Express, and GraphQL API**

## TODOs

- [] Demo Storefront

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Setup application (first time):**
   ```bash
   npm setup
   ```

## Start

1. **Run tunnel (cloudflared):**
   ```bash
   npm run cloudflared
   ```
2. **Configure shopify.app.toml:**
   > Change the necessary parameters in the shopify.app.toml file.
3. **Run dev:**
   ```bash
   npm run dev
   ```

## Deploy

1. **Deploy application:**
   ```bash
   npm run deploy
   ```

## Note

> The .env file will be automatically created. Focus on configuring the files: .firebaserc (for Firebase) and shopify.app.toml (for Shopify App).
