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
        <div>
            <h2>Similarity Methods</h2>
            <div>
                {methods.map((method) => (
                    <label key={method.value}>
                        <input
                            type="checkbox"
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
