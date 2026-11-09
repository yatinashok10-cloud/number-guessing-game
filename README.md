# Guess My Number

A number guessing game I made in three versions: a web page, a Python script and a Java program. The computer picks a secret number and you try to find it before you run out of tries.

**Play it here:** https://yguessthenumber.netlify.app/


[Screenshot] (<img width="1919" height="956" alt="Screenshot 2026-11-09 040426" src="https://github.com/user-attachments/assets/d5439f4d-af9a-460d-a6ee-1def9a346514" />)


## Levels

| Level  | Number range | Tries |
|--------|--------------|-------|
| Easy   | 1 to 50      | 10    |
| Medium | 1 to 100     | 7     |
| Hard   | 1 to 500     | 9     |

## What it does

- Says "too high" or "too low" after every guess
- Won't let you guess the same number twice
- Web version: shows how close you are (from "ice cold" to "super close"), the range the number must be in, a row of boxes for your tries, and your best score for each level
- Web version works on phones, has a dark mode, and uses a midnight black, white and lime green colour palette

## How to run it

**Web version:** open `index.html` in a browser.

**Python version:** you need Python 3.

```
python guess_the_number.py
```

**Java version:** you need Java installed.

```
javac GuessingGame.java
java GuessingGame
```

## Files

```
index.html            the web page
style.css             the look of the page
script.js             the game code for the web version
guess_the_number.py   the Python version
GuessingGame.java     the Java version
favicon.svg           the tab icon
LICENSE               MIT license
```

## License

MIT. See the `LICENSE` file.

Made by Yatin.
