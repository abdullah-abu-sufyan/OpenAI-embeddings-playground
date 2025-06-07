import React from 'react';

export type SimilarityMethod = 'cosine' | 'dotProduct' | 'euclidean' | 'manhattan';

interface MethodCheckboxesProps {
    selectedMethods: SimilarityMethod[];
    onMethodsChange: (methods: SimilarityMethod[]) => void;
}

const methods: { label: string; value: SimilarityMethod }[] = [
    { label: 'Cosine Similarity', value: 'cosine' },
    { label: 'Dot Product', value: 'dotProduct' },
    { label: 'Euclidean Distance', value: 'euclidean' },
    { label: 'Manhattan Distance', value: 'manhattan' },
];

const MethodCheckboxes: React.FC<MethodCheckboxesProps> = ({ selectedMethods, onMethodsChange }) => {
    const handleCheckboxChange = (method: SimilarityMethod, isChecked: boolean) => {
        if (isChecked) {
            onMethodsChange([...selectedMethods, method]);
        } else {
            onMethodsChange(selectedMethods.filter((m) => m !== method));
        }
    };

    return (
        <div className='grid gap-3'>
            <h2>Similarity Methods</h2>
            <div className='flex gap-3'>
                {methods.map((method) => (
                    <label key={method.value}
              className="flex items-center space-x-2  rounded-lg hover:bg-gray-50 cursor-pointer transition"

          >
                        <input
                            type="checkbox"
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"

                            value={method.value}
                            checked={selectedMethods.includes(method.value)}
                            onChange={(e) => handleCheckboxChange(method.value, e.target.checked)}
                        />
                        <span>{method.label}</span>
                    </label>
                ))}
            </div>
        </div>
    );
};

export default MethodCheckboxes;
