# بسم الله الرحمن الرحيم
# OpenAI Embeddings Playground
Hosted instance: https://open-ai-embeddings-playground.vercel.app/

A simple web application for comparing OpenAI embeddings using various similarity methods. It offers a user-friendly interface to input text, select an OpenAI embedding model, choose similarity methods, and visualize comparison results.

## Features

*   **Text Input**: Input multiple text snippets for comparison.
*   **Model Selection**: Choose from OpenAI embedding models (e.g., `text-embedding-3-small`).
*   **Similarity Methods**: Compare embeddings using Cosine Similarity, Dot Product, Euclidean Distance, and Manhattan Distance.
*   **Interactive Results**: View a matrix of similarity scores.
*   **API Key Handling**: Your OpenAI API key is used only for generating embeddings and is not stored.

## Technologies Used

*   **Next.js**
*   **OpenAI API**

## Getting Started

### Prerequisites

*   Node.js (LTS)
*   npm or Yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/openai-embeddings-playground.git
    cd openai-embeddings-playground
    ```
    (Replace with your repository URL)

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

## Usage

To run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## License

This project is licensed under the MIT License.
