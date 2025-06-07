import React from 'react';
import { SimilarityMethod } from './MethodCheckboxes';

interface ResultMatrixProps {
    results: {
        method: SimilarityMethod;
        matrix: number[][];
    }[];
    texts: string[];
}

const methodDescriptions: Record<SimilarityMethod, string> = {
    cosine: 'Measures the cosine of the angle between two vectors. Values range from -1 (opposite) to 1 (identical), with 0 indicating orthogonality. Higher values mean more similarity.',
    dotProduct: 'Measures the magnitude of one vector in the direction of another. Higher values indicate greater similarity, especially for longer vectors.',
    euclidean: 'Measures the straight-line distance between two points (vectors) in Euclidean space. Lower values indicate greater similarity (closer points).',
    manhattan: 'Measures the sum of the absolute differences of their Cartesian coordinates. Also known as L1 distance. Lower values indicate greater similarity.',
};

const ResultMatrix: React.FC<ResultMatrixProps> = ({ results, texts }) => {
    if (!results || results.length === 0 || texts.length === 0) {
        return null;
    }

    return (
        <div>
            <h2>Comparison Results</h2>
            {results.map((result) => (
                <div key={result.method}>
                    <h3>{result.method.replace(/([A-Z])/g, ' $1').trim()}</h3>
                    <p>{methodDescriptions[result.method]}</p>
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                    {texts.map((_, i) => (
                                        <th key={i}>Text {i + 1}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {result.matrix.map((row, rowIndex) => (
                                    <tr key={rowIndex}>
                                        <td>Text {rowIndex + 1}</td>
                                        {row.map((value, colIndex) => (
                                            <td key={colIndex}>
                                                {rowIndex === colIndex ? '-' : value !== undefined ? value.toFixed(4) : 'N/A'}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ResultMatrix;
