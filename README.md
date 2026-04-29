# Skana.lv — Website

Modern React website for Skana.lv — professional sound & stage equipment rental.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── App.jsx                  — Main layout (assembles all sections)
├── main.jsx                 — Entry point
├── index.css                — Global styles & CSS variables
└── components/
    ├── Navbar.jsx           — Sticky navigation with dropdown
    ├── Hero.jsx             — Hero/landing section
    ├── Services.jsx         — Interactive services grid
    ├── About.jsx            — About + process steps
    ├── Contact.jsx          — Contact form
    ├── Footer.jsx           — Footer with links
    └── ChatBot.jsx          — AI chatbot widget ⚡
```

## Customization

### 1. Logo
Place your logo file at `public/logo.png`

### 2. Colors
Edit CSS variables in `src/index.css`:
```css
:root {
  --green: #2d9e47;     /* Primary green (from logo) */
  --blue:  #0ea5c9;     /* Primary blue (from logo) */
  ...
}
```

### 3. Content
- **Services**: Edit the `SERVICES` array in `src/components/Services.jsx`
- **Contact info**: Edit phone, email in `src/components/Contact.jsx`
- **Stats**: Edit the stats in `src/components/Hero.jsx`

### 4. AI Chatbot
Edit `CHATBOT_CONFIG` at the top of `src/components/ChatBot.jsx`:
```js
const CHATBOT_CONFIG = {
  systemPrompt: '...',  // Your company knowledge & instructions
  greeting: '...',       // First message shown to users
  tooltip: '...',        // Hover tooltip on chat button
  title: '...',          // Chat window title
}
```

> ⚠️ **Important**: The chatbot uses the Anthropic API. You need to configure
> your API key in the server/backend to avoid exposing it in the frontend.
> For production, proxy API calls through your own backend endpoint and
> replace the fetch URL in `sendMessageToAPI()`.

### 5. Contact Form
The form currently simulates submission. Replace the `handleSubmit` function
in `src/components/Contact.jsx` with your actual backend endpoint:
```js
const handleSubmit = async (e) => {
  e.preventDefault()
  await fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(form),
    headers: { 'Content-Type': 'application/json' }
  })
  setSubmitted(true)
}
```

### 6. SEO
Edit meta tags in `index.html` — title, description, OG image, schema.org data.

## Tech Stack
- React 18
- Vite 5
- CSS custom properties (no CSS framework)
- Anthropic API (chatbot)
- Google Fonts: Syne + DM Sans
