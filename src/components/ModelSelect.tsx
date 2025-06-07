import React from 'react';

interface ModelSelectProps {
    selectedModel: string;
    onModelChange: (model: string) => void;
}

const models = [
    'text-embedding-3-small',
    'text-embedding-3-large',
    'text-embedding-ada-002',
];

const ModelSelect: React.FC<ModelSelectProps> = ({ selectedModel, onModelChange }) => {
    return (
        <div>
            <h2>Select Model</h2>
            <select value={selectedModel} onChange={(e) => onModelChange(e.target.value)}>
                {models.map((model) => (
                    <option key={model} value={model}>
                        {model}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default ModelSelect;
