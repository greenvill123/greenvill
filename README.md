# Greenvill Associates

Professional website for Greenvill Associates, offering financial loan solutions and construction services in Trichy.

## 🚀 Features

*   **Modern UI/UX**: Responsive design with glassmorphism headers, smooth animations, and a clean color palette.
*   **EMI Calculator**: Real-time loan EMI calculation tool.
*   **Service Showcases**: Dedicated sections for Personal, Home, and Business loans, as well as Construction projects.
*   **Contact Forms**: Integrated with Google Apps Script to save inquiries directly to Google Sheets and send email notifications.
*   **SEO Optimized**: Technical SEO improvements for better local search visibility.

## 🛠️ Tech Stack

*   **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
*   **Backend**: Google Apps Script (Serverless Form Handling)
*   **Database**: Google Sheets

## 📂 Project Structure

```text
├── assets/
│   ├── styles/     # Main stylesheets (Design System)
│   ├── scripts/    # Application logic & Form handlers
│   └── images/     # Optimized assets
├── index.html      # Landing Page (Loans)
├── construction.html # Construction Services Page
├── contact.html    # General Contact Page
└── README.md
```

## ⚙️ Setup & Deployment

1.  Clone the repository.
2.  Open `index.html` in any web browser.
3.  **Backend Configuration**:
    *   The forms are connected to a specific Google Apps Script URL in `assets/scripts/main.js`.
    *   If you fork this project, you must deploy your own Google Script and update the `SCRIPT_URL` variable.

## 📄 License

All rights reserved © Greenvill Associates.
