import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Random;
import java.util.Scanner;

public class GuessingGame {

    private static final Scanner in = new Scanner(System.in);
    private static final Random random = new Random();

    private static final String[] NAMES = {"Easy", "Medium", "Hard"};
    private static final int[] MAX = {50, 100, 500};
    private static final int[] TRIES = {10, 7, 9};

    public static void main(String[] args) {
        try {
            do {
                play();
                System.out.print("\nPlay again? (y/n): ");
            } while (in.nextLine().trim().equalsIgnoreCase("y"));

            System.out.println("Thanks for playing!");
        } catch (NoSuchElementException e) {
            System.out.println("\nBye!");
        }
    }

    private static int chooseLevel() {
        while (true) {
            System.out.println("\nChoose a level:");
            for (int i = 0; i < NAMES.length; i++) {
                System.out.printf("  %d) %s: 1-%d, %d tries%n",
                        i + 1, NAMES[i], MAX[i], TRIES[i]);
            }
            System.out.print("Level: ");
            String choice = in.nextLine().trim();

            if (choice.equals("1") || choice.equals("2") || choice.equals("3")) {
                return Integer.parseInt(choice) - 1;
            }
            System.out.println("Please enter 1, 2 or 3.");
        }
    }

    private static int readGuess(int attempt, int tries, int max, List<Integer> tried) {
        while (true) {
            System.out.printf("Guess %d/%d: ", attempt, tries);
            String raw = in.nextLine().trim();

            int guess;
            try {
                guess = Integer.parseInt(raw);
            } catch (NumberFormatException e) {
                System.out.println("Enter a whole number from 1 to " + max + ".");
                continue;
            }

            if (guess < 1 || guess > max) {
                System.out.println("Enter a whole number from 1 to " + max + ".");
            } else if (tried.contains(guess)) {
                System.out.println("You already tried that number.");
            } else {
                return guess;
            }
        }
    }

    private static void play() {
        int level = chooseLevel();
        int max = MAX[level];
        int tries = TRIES[level];
        int secret = random.nextInt(max) + 1;
        List<Integer> tried = new ArrayList<>();

        System.out.printf("%n%s mode: I'm thinking of a number between 1 and %d.%n",
                NAMES[level], max);

        for (int attempt = 1; attempt <= tries; attempt++) {
            int guess = readGuess(attempt, tries, max, tried);
            tried.add(guess);

            if (guess == secret) {
                String word = attempt == 1 ? "try" : "tries";
                System.out.println("Correct! You got it in " + attempt + " " + word + ".");
                return;
            }
            System.out.println(guess > secret ? "Too high. Go lower." : "Too low. Go higher.");
        }

        System.out.println("Out of tries! The number was " + secret + ".");
    }
}