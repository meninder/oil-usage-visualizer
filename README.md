# Oil Visualization Dashboard

Dashboard to monitor home heating oil levels.

## Project Setup

*   **Dependencies:** Node.js & npm
*   **Install:** `npm i`
*   **Develop:** `npm run dev`

## Technologies

*   Vite
*   TypeScript
*   React
*   shadcn-ui
*   Tailwind CSS

## API Endpoints

*   AWS Lambda Function to fetch oil level data: [here](https://o3rm6sgjxd.execute-api.us-east-1.amazonaws.com/main/getDailyData)
*   AWS Lambda Function to get refill data: [here](https://8rtdju7dv9.execute-api.us-east-1.amazonaws.com/main/getRefillsData)

## Deployment

*   `npm run build`
*   Push to `master` (GitHub Actions deploys to GitHub Pages)