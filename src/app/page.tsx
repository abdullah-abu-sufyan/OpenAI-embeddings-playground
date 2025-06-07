'use client';

import React, { useState } from "react";
import TextInputs from "../components/TextInputs";
import ModelSelect from "../components/ModelSelect";
import MethodCheckboxes, { SimilarityMethod } from "../components/MethodCheckboxes";
import ResultMatrix from "../components/ResultMatrix";

// Helper functions for similarity calculations
function cosineSimilarity(vec1: number[], vec2: number[]): number {
    const dotProductVal = vec1.reduce((sum, val, i) => sum + val * vec2[i], 0);
    const magnitude1 = Math.sqrt(vec1.reduce((sum, val) => sum + val * val, 0));
    const magnitude2 = Math.sqrt(vec2.reduce((sum, val) => sum + val * val, 0));
    if (magnitude1 === 0 || magnitude2 === 0) return 0;
    return dotProductVal / (magnitude1 * magnitude2);
}

function dotProduct(vec1: number[], vec2: number[]): number {
    return vec1.reduce((sum, val, i) => sum + val * vec2[i], 0);
}

function euclideanDistance(vec1: number[], vec2: number[]): number {
    const sumOfSquares = vec1.reduce((sum, val, i) => sum + Math.pow(val - vec2[i], 2), 0);
    return Math.sqrt(sumOfSquares);
}

function manhattanDistance(vec1: number[], vec2: number[]): number {
    return vec1.reduce((sum, val, i) => sum + Math.abs(val - vec2[i]), 0);
}

interface ComparisonResult {
    method: SimilarityMethod;
    matrix: number[][];
}

export default function Home() {
    const [apiKey, setApiKey] = useState('');
    const [texts, setTexts] = useState(['', '']);
    const [selectedModel, setSelectedModel] = useState('text-embedding-3-small');
    const [selectedMethods, setSelectedMethods] = useState<SimilarityMethod[]>(['cosine']);
    const [results, setResults] = useState<ComparisonResult[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleCompare = async () => {
        setError('');
        setResults(null);
        setLoading(true);

        if (!apiKey) {
            setError('Please enter your OpenAI API Key.');
            setLoading(false);
            return;
        }

        if (texts.some(text => text.trim() === '')) {
            setError('Please ensure all text inputs are filled.');
            setLoading(false);
            return;
        }

        if (selectedMethods.length === 0) {
            setError('Please select at least one similarity method.');
            setLoading(false);
            return;
        }

        try {
            // Get embeddings for all texts
            const embeddingPromises = texts.map(async (text: string) => {
                const response = await fetch('https://api.openai.com/v1/embeddings', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${apiKey}`,
                    },
                    body: JSON.stringify({
                        model: selectedModel,
                        input: text,
                    }),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error?.message || 'Failed to get embeddings from OpenAI.');
                }

                const data = await response.json();
                return data.data[0].embedding;
            });

            const embeddings = await Promise.all(embeddingPromises);

            const newResults: { method: SimilarityMethod; matrix: number[][] }[] = [];

            // Calculate similarity for each selected method
            for (const method of selectedMethods) {
                const matrix: number[][] = Array(texts.length)
                    .fill(0)
                    .map(() => Array(texts.length).fill(0));

                for (let i = 0; i < texts.length; i++) {
                    for (let j = 0; j < texts.length; j++) {
                        if (i === j) {
                            matrix[i][j] = 1; // Self-similarity is 1 for cosine/dot product, 0 for distance
                            if (method === 'euclidean' || method === 'manhattan') {
                                matrix[i][j] = 0;
                            }
                        } else {
                            const vec1 = embeddings[i];
                            const vec2 = embeddings[j];

                            switch (method) {
                                case 'cosine':
                                    matrix[i][j] = cosineSimilarity(vec1, vec2);
                                    break;
                                case 'dotProduct':
                                    matrix[i][j] = dotProduct(vec1, vec2);
                                    break;
                                case 'euclidean':
                                    matrix[i][j] = euclideanDistance(vec1, vec2);
                                    break;
                                case 'manhattan':
                                    matrix[i][j] = manhattanDistance(vec1, vec2);
                                    break;
                                default:
                                    matrix[i][j] = NaN;
                            }
                        }
                    }
                }
                newResults.push({ method, matrix });
            }
            setResults(newResults);
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main>
            <h1>OpenAI Embeddings Playground</h1>

            <section>
                <label htmlFor="api-key">OpenAI API Key</label>
                <input
                    id="api-key"
                    type="password"
                    placeholder="Enter your OpenAI API Key (e.g., sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx)"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                />
                <p>Your API key is used only for generating embeddings and is not stored.</p>
            </section>

            <section>
                <TextInputs texts={texts} onTextsChange={setTexts} />
                <ModelSelect selectedModel={selectedModel} onModelChange={setSelectedModel} />
                <MethodCheckboxes selectedMethods={selectedMethods} onMethodsChange={setSelectedMethods} />
            </section>

            <section>
                <button onClick={handleCompare} disabled={loading}>
                    {loading ? "Comparing..." : "Compare Embeddings"}
                </button>
            </section>

            {error && (
                <div style={{ color: 'red' }}>
                    <strong>Error:</strong> {error}
                </div>
            )}

            {results && (
                <section>
                    <ResultMatrix results={results} texts={texts} />
                    <div>
                        <h3>How to interpret the results:</h3>
                        <ul>
                            <li>
                                <strong>Cosine Similarity:</strong> Values range from -1 to 1. Closer to 1 means texts are more similar.
                            </li>
                            <li>
                                <strong>Dot Product:</strong> Higher values indicate greater similarity, especially for longer vectors.
                            </li>
                            <li>
                                <strong>Euclidean Distance:</strong> Lower values indicate texts are closer in vector space.
                            </li>
                            <li>
                                <strong>Manhattan Distance:</strong> Lower values indicate texts are closer in vector space.
                            </li>
                        </ul>
                    </div>
                </section>
            )}
        </main>
    );
}
