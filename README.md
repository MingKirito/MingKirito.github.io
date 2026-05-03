# 🌸 Portfolio — Setup Guide

A clean, minimal dark portfolio with a pastel gradient theme (white → pink → blue → matcha green).

---

## 📁 Project Structure

```
portfolio/
├── index.html          ← Main page (all sections)
├── css/
│   └── style.css       ← All styles + CSS variables
├── js/
│   └── main.js         ← Interactions, animations, scroll effects
├── assets/
│   └── resume.pdf      ← Drop your resume PDF here
└── README.md
```

---

## 🚀 Running Locally in VS Code

### Option A — Live Server (Recommended)
1. Open the `portfolio/` folder in VS Code
2. Install the **Live Server** extension (search in Extensions tab)
3. Right-click `index.html` → **Open with Live Server**
4. Opens at `http://127.0.0.1:5500`

### Option B — Direct Open
- Double-click `index.html` to open in your browser (some JS features may differ)

---

## ✏️ Personalising Your Content

### In `index.html`, find and replace:

| Placeholder        | Replace with                  |
|--------------------|-------------------------------|
| `Your Name`        | Your real name                |
| `YN`               | Your initials                 |
| `your@email.com`   | Your email address            |
| `yourprofile`      | Your LinkedIn handle          |
| `yourusername`     | Your GitHub username          |
| Project titles     | Your actual projects          |
| Experience entries | Your real experience          |
| Skill percentages  | Adjust `data-pct="XX"` values |

### Profile Photo
Replace the initials placeholder in `.about-image-placeholder`:
```html
<!-- Remove the div.image-initials, add: -->
<img src="assets/your-photo.jpg" alt="Your Name" 
     style="width:100%;height:100%;object-fit:cover;border-radius:18px;position:relative;z-index:1;" />
```

### Resume PDF
Drop your resume into `assets/resume.pdf` — the "Resume PDF ↗" link is already wired up.

---

## 🎨 Customising Colours

All colours are CSS variables in `css/style.css` at the top:

```css
--pink:   #f2b8c6;   /* blush pink accent */
--blue:   #a8cadf;   /* sky blue accent */
--green:  #b5cba3;   /* matcha green accent */
--bg:     #1a1a1f;   /* main background */
```

Adjust hex values to your taste — everything updates automatically.

---

## 🌐 Hosting (Free Options)

| Platform     | How                                              |
|--------------|--------------------------------------------------|
| **GitHub Pages** | Push to GitHub repo → Settings → Pages → Deploy from main |
| **Netlify**  | Drag & drop the `portfolio/` folder at netlify.com/drop |
| **Vercel**   | Connect GitHub repo at vercel.com                |

---

## 📬 Contact Form
The form currently shows a success animation but doesn't send emails.  
To make it functional, you can integrate:
- **Formspree** (free): Replace the form action with your Formspree endpoint
- **EmailJS**: Add their SDK and update `main.js`

### Formspree Quick Setup:
1. Sign up at [formspree.io](https://formspree.io)
2. Create a form → copy your endpoint URL
3. In `index.html`: `<form class="contact-form" action="https://formspree.io/f/YOUR_ID" method="POST">`
4. Remove the `e.preventDefault()` in `main.js` (or keep for SPA behaviour)

---

Built with HTML, CSS, and vanilla JavaScript. No build tools required.
