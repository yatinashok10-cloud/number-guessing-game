# Computer Quiz

A quiz game with 56 questions on computers, physics, chemistry, biology, maths, geography, history, English and general knowledge. It started as a terminal game in Python, and I then made a web version you can play in the browser.

<img width="1920" height="999" alt="Screenshot 2026-11-07 200845" src="https://github.com/user-attachments/assets/b131375b-05f4-4b5e-b8b6-a98cbf988ed1" />


**Try it online:** https://quizformiddlegraders.netlify.app/

## What it does

- Picks 10 random questions each round (you can change the number)
- 4 multiple-choice options per question, shuffled every time
- Live score and a progress bar
- Shows the right answer when you get one wrong
- The Python version also has coloured text, typing effects, a streak counter, and a score breakdown by subject

## Why I made it

because i like games and wanted to increase sharpness of my general knowledge

## How it was made

**Terminal version:** written in plain Python with no extra libraries (just `random`, `time`, `sys`, `os`). Questions are stored as tuples in a list, so adding one means copying a line and changing the text. It uses ANSI colour codes, which is why it checks `sys.stdout.isatty()` first, so colours don't break in IDLE or the VS Code Output tab.

**Web version:** HTML, CSS and vanilla JavaScript, with no frameworks. It uses the same question list as the Python version.

## Tech stack

- Python 3 (terminal version)
- HTML, CSS, JavaScript (web version)

## How to run it

You can just play it online at the link above, you only need an internet connection. To run it on your own computer:

### Terminal version

1. Clone the repo
2. Run the quiz (needs Python 3, no installs required)
python quiz.py
Run it in a real terminal. In VS Code, use Terminal > New Terminal.

### Web version

https://numberguessingbyyatin.netlify.app/


## Adding your own questions

no do not because you may damage the code

Made by Yatin
