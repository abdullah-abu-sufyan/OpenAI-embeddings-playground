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
        <div className='grid gap-3'>
            <h2 className='font-medium'>Comparison Results</h2>

            {results.map((result) => (
        <div key={result.method} className="space-y-4">
      <div className="space-y-1">
        <h3 className="text-xl font-semibold text-indigo-600">
          {result.method.replace(/([A-Z])/g, ' $1').trim()}
        </h3>
        <p className="text-sm text-slate-600">{methodDescriptions[result.method]}</p>
      </div>

      <div className="overflow-x-auto rounded-lg border border-slate-200 shadow-sm">
        <table className="min-w-full text-sm text-left text-slate-700">
          <thead className="bg-slate-200">
            <tr>
              <th className="px-4 py-2 border-b border-slate-200">Inputs</th>
              {texts.map((_, i) => (
                <th key={i} className="px-4 py-2 border-b border-slate-200 text-center">
                  Text {i + 1}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {result.matrix.map((row, rowIndex) => (
              <tr key={rowIndex} className={rowIndex % 2 === 0 ? "" : "bg-slate-100"}>
                <td className="px-4 py-2 font-medium text-slate-800 border-b border-slate-100">
                  Text {rowIndex + 1}
                </td>
                {row.map((value, colIndex) => (
                  <td
                    key={colIndex}
                    className="px-4 py-2 text-center border-b border-slate-100"
                  >
                    {rowIndex === colIndex
                      ? '—'
                      : value !== undefined
                      ? value.toFixed(4)
                      : 'N/A'}
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
