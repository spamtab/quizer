# 🎯 Quiz App

A self-study quiz web application built with Vite, Vue 3, and vanilla CSS. Features a dark mode interface, customizable settings, and support for multiple subjects and topics.

## ✨ Features

- **Multiple-choice questions** with instant color feedback (green for correct, red for incorrect)
- **Customizable settings:**
  - Choose number of questions per quiz
  - Filter by subject and topic
  - Shuffle questions option
- **Progress tracking** with visual progress bar
- **Score display** with performance feedback
- **Responsive design** - works on mobile and desktop
- **Dark mode** minimalistic UI
- **GitHub Pages compatible**

## 📁 Project Structure

```
quizer/
├── public/
├── src/
│   ├── components/
│   │   ├── QuestionCard.vue    # Question display with answer options
│   │   ├── ScoreCard.vue       # Final score display
│   │   └── Settings.vue        # Quiz settings page
│   ├── data/
│   │   └── questions.json      # Quiz questions database
│   ├── pages/
│   │   ├── Home.vue           # Landing page
│   │   └── Quiz.vue           # Main quiz page
│   ├── router/
│   │   └── index.js           # Vue Router configuration
│   ├── styles/
│   │   └── global.css         # Global styles and utilities
│   ├── App.vue
│   └── main.js
├── index.html
├── package.json
└── vite.config.js
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository or download the files

2. Install dependencies:
```bash
npm install
```

3. Run development server:
```bash
npm run dev
```

4. Open your browser to the URL shown in the terminal (usually `http://localhost:5173`)

## 🏗️ Building for Production

Build the app for deployment:

```bash
npm run build
```

The built files will be in the `dist/` folder.

## 🌐 GitHub Pages Deployment

### Manual Deployment

1. Build the project:
```bash
npm run build
```

2. The `dist/` folder contains your production-ready files

3. Deploy the `dist/` folder to GitHub Pages:
   - Go to your repository settings
   - Navigate to Pages section
   - Select "Deploy from a branch"
   - Choose the branch containing your `dist/` folder
   - Or use GitHub Actions for automated deployment

### Using GitHub Actions (Recommended)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: ['main']

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      
      - name: Install dependencies
        run: npm install
      
      - name: Build
        run: npm run build
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## 📝 Adding Questions

Edit `src/data/questions.json` to add or modify questions:

```json
{
  "id": 1,
  "question": "Your question here?",
  "options": [
    "Option A",
    "Option B",
    "Option C",
    "Option D"
  ],
  "correctOption": 1,
  "subject": {
    "name": "Subject Name",
    "topic": "Topic Name"
  }
}
```

- `correctOption` is 1-indexed (1, 2, 3, or 4)
- Add subjects and topics to organize your questions

## 🎨 Customization

### Styling

Modify `src/styles/global.css` to change colors, fonts, or layout:

```css
:root {
  --bg-primary: #0f172a;
  --bg-secondary: #1e293b;
  --accent: #3b82f6;
  --success: #22c55e;
  --error: #ef4444;
}
```

### Quiz Behavior

Settings are stored in `localStorage` and include:
- Question count
- Subject filter
- Topic filter
- Shuffle option

## 🔧 Technologies Used

- **Vue 3** - Progressive JavaScript framework
- **Vue Router** - Official routing library
- **Vite** - Next-generation frontend tooling
- **Vanilla CSS** - No CSS frameworks, pure CSS
- **LocalStorage** - For persistent settings

## 📱 Browser Support

Works on all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to fork this project and customize it for your needs!

---

Made with ❤️ using Vue 3 + Vite

