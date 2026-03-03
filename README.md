# ClearTab - Custom Homepage

A minimalist, distraction-free browser homepage with a Glassmorphism design. Built with Flask on the backend and vanilla JS/CSS on the frontend, deployed on Vercel.

**Live**: [custom-homepage-liart.vercel.app](https://cleartab.vercel.app)

---

## Features

- **Glassmorphism UI**: Translucent cards, blur effects, and smooth transitions throughout.
- **Multi-Engine Search**: Switch between Google, YouTube, and DuckDuckGo using the engine toggle icon.
- **Personalized Greeting**: Time-based greeting (Morning / Afternoon / Evening / Night) with an editable name stored in localStorage.
- **Quick Access Cards**: Add custom links with auto-fetched favicons. Default links included. Cards can be deleted on hover.
- **Live Clock & Date**: Real-time clock (24hr) with weekday and date display.
- **Year Progress Calendar**: Shows a GitHub-style grid of the current year with past, present, and future days highlighted. Displays percentage of the year elapsed.
- **Dark / Light Mode**: Toggle between themes, persisted via localStorage.
- **Dynamic Backgrounds**: Fetches a random background from Picsum Photos when online; falls back to a local image offline.
- **Responsive Design**: Mobile layout with a collapsible controls row.
- **Settings Page**: Separate `/settings` route served by Flask.

---

## Tech Stack

- **Backend**: Python / Flask
- **Frontend**: HTML5, CSS3 (CSS Variables, Glassmorphism), JavaScript (ES6+)
- **Fonts**: Google Fonts (Oswald, Roboto, Ubuntu)
- **Deployment**: Vercel (Python serverless)

---

## Project Structure

```
CustomHomepage/
├── app.py                  # Flask app, serves routes
├── templates/
│   ├── index.html          # Main homepage
│   └── settings.html       # Settings page
├── static/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   ├── logic.js
│   │   └── calendar.js
│   └── img/                # Icons, fonts, fallback background
├── requirements.txt
├── vercel.json
└── manifest.json           # Chrome Extension manifest (for local extension use)
```

---

## Running Locally

```bash
pip install flask
python app.py
```

Then open `http://localhost:5000` in your browser.

---

## Deployment (Vercel)

The project uses `@vercel/python` to run Flask as a serverless function.

**`vercel.json`**:
```json
{
  "builds": [{ "src": "app.py", "use": "@vercel/python" }],
  "routes": [{ "src": "/(.*)", "dest": "app.py" }]
}
```

Push to GitHub — Vercel auto-deploys on each commit.

---

## Chrome Extension (Optional)

The `manifest.json` allows this to be loaded as a Chrome new tab extension locally.

1. Go to `chrome://extensions/`
2. Enable Developer Mode
3. Click **Load unpacked** and select this folder

---

## Roadmap

- [ ] Todo list integration
- [ ] Additional API integrations

---

## License

Licensed under AGPL-3.0. See [LICENSE](LICENSE) for details.