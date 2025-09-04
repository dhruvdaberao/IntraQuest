# Clarity - AI-Powered Personality Insights

Clarity is a modern web application designed to help users discover their 16-type personality through an engaging and insightful quiz. It leverages the power of the Google Gemini API to provide a deep, detailed, and personalized analysis of the user's personality type, presented in a sleek and dynamically themed interface.

## Features

- **Dynamic Quiz Length**: Users can choose between a quick 10-question test, a standard 25-question test, or a deep-dive 50-question test for more accurate results.
- **16-Type Personality Calculation**: Based on the user's answers, the app calculates their personality type according to the well-known 4-dichotomy model (e.g., INTJ, ENFP).
- **Deep AI-Powered Analysis**: The calculated personality type is sent to the Google Gemini API to generate a rich, multi-faceted analysis.
- **Comprehensive Insights**: The results include:
  - A creative title and detailed overview.
  - Strengths & Weaknesses.
  - Suitable Career Paths.
  - Relationship dynamics.
  - Personalized suggestions for personal growth.
- **Fun & Engaging Content**:
  - **Vibe Check**: Discover your signature color, aesthetic, and overall vibe.
  - **Allies**: A list of famous figures and fictional characters who share your personality type.
  - **Recommendation Hub**: Personalized suggestions for hobbies, books, movies, and music.
- **Dynamic Theming**: The entire results screen transforms its color scheme to match the user's unique personality type, creating a beautiful and immersive experience.
- **Sleek & Modern UI**: Built with Tailwind CSS, the interface is clean, responsive, and intuitive on all devices.

## Tech Stack

- **Frontend**: React, TypeScript
- **Styling**: Tailwind CSS
- **AI**: Google Gemini API (`@google/genai`)

## How It Works

1.  **Welcome**: The user is greeted with a clean interface and chooses their desired quiz length.
2.  **Quiz**: The user answers a series of multiple-choice questions designed to gauge their preferences across four key dichotomies.
3.  **Calculation**: The app calculates the user's 4-letter personality type based on their answers.
4.  **API Request**: The personality type is sent to the Google Gemini API with a structured prompt requesting a detailed analysis in JSON format.
5.  **Results**: The API returns a rich JSON object containing all the insights. The application parses this data and displays it on the results screen, which dynamically changes its theme based on the user's personality type.

## Running the Application

This application is designed to run in a managed environment where the Google Gemini API key is securely provided.

- An environment variable `API_KEY` must be configured with a valid Google Gemini API key for the application to function.
- No further local setup is required to run this in the intended development environment.
