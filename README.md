# Drag and Drop Shapes

This is a simple React application with TypeScript built using Vite, allowing users to create draggable shapes and draw lines between them.

## Deployed App

You can view the deployed app at [https://heavy-drag-n-drop.netlify.app/](https://heavy-drag-n-drop.netlify.app/).

## Features

- Double-click to create a circle with a random size (between 30px and 80px) and color.
- Right-click on a circle to toggle between a circle and a square shape. Squares are not draggable.
- Click on two circles to create a line between them.
- Drag circles to move them around. Lines adjust their position accordingly.
- Lines move along with the connected circles. Squares and lines between squares are not draggable.

## Installation

1. Clone the repository:

    ```bash
    git clone <repository-url>
    ```

2. Navigate to the project directory:

    ```bash
    cd drag-and-drop-shapes
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

## Usage

1. Start the development server:

    ```bash
    npm run dev
    ```

2. Open your browser and navigate to `http://localhost:5173/`.

3. Double-click to create shapes, right-click to toggle between circle and square, and click on two circles to draw lines between them. Drag shapes to move them around.

## Technologies Used

- React
- TypeScript
- Vite
- HTML5
- CSS3

