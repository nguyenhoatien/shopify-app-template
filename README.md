# Shopify App Template (Firebase)

This is a simple template to help you build great Shopify apps.

**Key Features:**

*   **Pay-as-you-go:** Uses Firebase for cost-effective scaling.
*   **Shopify Look & Feel:** Uses the Shopify Polaris design system.
*   **Modern Tech:** Built with React, React Router, Express, and GraphQL.

## What's Left To Do (TODOs):

*   [x] Fix SameSite cookie issue.
*   [x] Add a webhook demo.
*   [x] Add a public api.

## Getting Started (Installation)

1.  **Install:**
    ```bash
    npm install
    ```
2.  **First-Time Setup:**
    ```bash
    npm run setup
    ```

## Running the App (Start)

1.  **Start Tunnel (Cloudflared):**
    ```bash
    npm run cloudflared
    ```
2.  **Configure `shopify.app.toml`:**
    *   Open the `shopify.app.toml` file.
    *   Update the settings as needed for your app.
3.  **Start Development Server:**
    ```bash
    npm run dev
    ```

## Deploying Your App (Deploy)

1.  **Deploy:**
    ```bash
    npm run deploy
    ```

## Important Notes

*   The `.env` file will be created automatically.
*   Make sure to configure these files:
    *   `.firebaserc` (for Firebase settings)
    *   `shopify.app.toml` (for Shopify App settings)