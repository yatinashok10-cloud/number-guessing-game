# Guess My Number

A number guessing game that looks like a page from a notebook, sitting on a wooden desk. The computer picks a secret number, and you try to find it using "too high" and "too low" hints. It's a single HTML file and needs no installation or server.

## Features

- Three difficulty levels: Easy, Medium and Hard
- Tries shown as boxes you cross off
- Shows the range the number can still be in
- Hot/cold hints ("Getting warm", "Ice cold", and so on)
- Best score saved for each level
- A hand-drawn circle around the number when you win
- Light and dark mode that follows your device
- Layout adjusts for PC and phone screens

## System Requirements
any os

### Hardware

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| Processor | Any 1 GHz CPU (dual-core) | Any dual-core 2 GHz or faster |
| RAM | 512 MB free | 2 GB or more |
| Storage | 1 MB for the file | 1 MB |
| Display | 1024 x 768 | 1366 x 768 or larger |
| Input | Keyboard or touch | Keyboard and mouse |
| Graphics | Any (no GPU needed) | Any |

The game runs on practically any computer made in the last 10 years. It doesn't use much memory or processing power.

### Software

| Requirement | Details |
|-------------|---------|
| Operating system | Windows 7+, macOS 10.13+, Linux, Android, iOS |
| Browser | Chrome 90+, Edge 90+, Firefox 90+, Safari 14+ |
| JavaScript | Must be enabled |
| Internet | Optional. Only needed to load the handwriting font. Without it the game uses a default cursive font and works the same. |

### Not needed

- No Node.js, Python or other programming tools
- No web server
- No database
- No extra libraries to install

## How to Run

1. Download or copy `index.html` to any folder.
2. Double-click `index.html`. It opens in your default browser.
3. Start guessing.

## How to Play

1. Pick a level at the top of the page.
2. Type a number in the box and click **Guess** (or press Enter).
3. Read the hint and adjust. Each wrong guess crosses off one box.
4. Find the number before you run out of boxes.
5. Click **Go again** (or press Enter) to play another round.

### Levels

| Level | Number range | Tries |
|-------|--------------|-------|
| Easy | 1 to 50 | 10 |
| Medium | 1 to 100 | 7 |
| Hard | 1 to 500 | 9 |

## Project Structure

```
guess-my-number/
├── index.html    The whole game (HTML, CSS pyton and JavaScript)
└── README.md     This file
```

## Customizing

Open `index.html` in any text editor.

- **Change levels:** find `var LEVELS` near the bottom and edit `max` (highest number) and `tries` (number of guesses).
- **Change the sticky note text:** find `good luck :)` and replace it.
- **Change colors:** edit the values at the top of the `<style>` section, such as `--ink` (writing color) and `--paper` (page color).
- **Change the desk:** edit `--wood1` and `--wood2` to change the wood colors.

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Page is blank | Make sure the file starts with `<!DOCTYPE html>` and ends with `</html>`. |
| Old version still showing | Press Ctrl + Shift + R to reload without the cache. |
| Pencil, coffee ring and sticky note are missing | They are hidden on windows narrower than 760 px. Make the window wider. |
| Font looks plain | You're offline or the font failed to load. The game still works. |
| Best scores don't save | Your browser is blocking local storage (some private modes do). The game still works. |

## Browser Storage

Best scores are saved in your browser's local storage under the key `guess-best`. Nothing is sent anywhere. To reset your scores, clear the site data in your browser settings.

## License

Free to use, copy and change for personal

<img width="1920" height="1074" alt="Screenshot 2026-11-07 094206" src="https://github.com/user-attachments/assets/3304c6d2-5739-45dc-a7a4-d0a0fa47b4e2" />
