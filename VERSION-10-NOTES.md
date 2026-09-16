# Version 10 - Quiz + Secret Realm

Changes from V9:
- Added a new `Quiz` navigation item across the website.
- Added `quiz.html` with all 10 questions displayed on one page.
- Added a vertical progress indicator on desktop, with a compact horizontal version on mobile.
- Added score calculation with a 7/10 passing threshold.
- Passing message: “Wow, you actually passed. That’s surprising.”
- Passing action: `Enter the Realm`.
- Failing message: “No surprise there, kinda expected.”
- Added retry behavior for failed attempts.
- Added `secret.html`, which is deliberately NOT included in the navigation bar.
- Secret access is one-time per successful quiz pass. Leaving/reloading the secret page requires passing the quiz again.
- Added a placeholder 10-question data structure in `script.js` so the final personal questions and correct answers can be filled in later.
- Corrected the cake-cutting message to `give first slice to Aisha 🎉`.
- Preserved the existing birthday lock, local preview workflow, cake animation, Reasons framework, and other existing pages.
