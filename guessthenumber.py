import random

LEVELS = {
    "1": ("Easy", 50, 10),
    "2": ("Medium", 100, 7),
    "3": ("Hard", 500, 9),
}


def choose_level():
    while True:
        print("\nChoose a level:")
        for key, (name, high, tries) in LEVELS.items():
            print(f"  {key}) {name}: 1-{high}, {tries} tries")
        choice = input("Level: ").strip()
        if choice in LEVELS:
            return LEVELS[choice]
        print("Please enter 1, 2 or 3.")


def ask_guess(attempt, tries, high, tried):
    while True:
        raw = input(f"Guess {attempt}/{tries}: ").strip()
        if not (raw.isascii() and raw.isdigit()) or not 1 <= int(raw) <= high:
            print(f"Enter a whole number from 1 to {high}.")
        elif int(raw) in tried:
            print("You already tried that number.")
        else:
            return int(raw)


def play():
    name, high, tries = choose_level()
    secret = random.randint(1, high)
    tried = []

    print(f"\n{name} mode: I'm thinking of a number between 1 and {high}.")

    for attempt in range(1, tries + 1):
        guess = ask_guess(attempt, tries, high, tried)
        tried.append(guess)

        if guess == secret:
            word = "try" if attempt == 1 else "tries"
            print(f"Correct! You got it in {attempt} {word}.")
            return
        print("Too high. Go lower." if guess > secret else "Too low. Go higher.")

    print(f"Out of tries! The number was {secret}.")


def main():
    while True:
        play()
        if input("\nPlay again? (y/n): ").strip().lower() != "y":
            print("Thanks for playing!")
            break


if __name__ == "__main__":
    try:
        main()
    except (KeyboardInterrupt, EOFError):
        print("\nBye!")