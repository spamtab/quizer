I want to create a **self-study quiz web app** using Vite, Vue, JavaScript, and vanilla CSS. Please generate the code for the following requirements:

1. **Quiz Features:**
   - Multiple-choice questions (MCQs) with 4 options each.
   - Highlight the selected answer: green if correct, red if incorrect.
   - Show the score at the end of the quiz.
   - Add a button to retry the quiz.
   - Load questions from a local `questions.json` file.

2. **Github pages Support:**
   - The app should be compatible in github pages, i will build and deploy it manually

3. **Project Structure / Components:**
    src/pages/Home.vue        → Home page with "Start Quiz" and "Settings" buttons
    src/pages/Quiz.vue        → Quiz page showing one question at a time
    src/components/QuestionCard.vue → Displays question + 4 answers w/ color feedback
    src/components/ScoreCard.vue    → Shows final score + retry button
    src/components/Settings.vue     → Choose number of questions
    Use Vue Composition API with <script setup>

4. **Styling:**
    Use vanilla CSS in /src/styles
    Mobile-friendly / responsive
    CSS utility classes for:
    .correct → green highlight
    .incorrect → red highlight
    make it minimalistic and dark mode

5. **JavaScript (No TypeScript):**
   - Use clean, well-structured JavaScript.
   - Define JS objects or JSDoc typedefs for questions and quiz state (optional).

6. Features

settings option to Shuffle questions at quiz start
settings option to choose questions based on subject name and subject topic
settings option where the user can set the number of questions per quiz.
settings option to Randomize questions every time a quiz starts.

7. Data File

/src/data/questions.json containing sample MCQs
it should be of json format containing question id, question name, options, correct option number (1,2,3,4), subject: {name, topic}

8. Deliverables

✅ All project files
✅ Folder structure
✅ Vue components
✅ State logic
✅ CSS
✅ vite.config.js ready for GitHub Pages
✅ questions.json sample data

9. Goal

A complete Vite + Vue quiz app that:

✅ Runs locally
✅ Builds correctly
✅ Can be deployed and hosted on GitHub Pages
✅ Works on mobile and desktop
✅ Fully functional quiz system

Please generate all necessary files, folders, React components, CSS files, data files, and Vite PWA configuration so I can run the app locally and install it on mobile with full offline functionality.
