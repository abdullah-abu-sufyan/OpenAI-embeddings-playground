import React, { useState } from 'react';

interface TextInputsProps {
    texts: string[];
    onTextsChange: (texts: string[]) => void;
}

const TextInputs: React.FC<TextInputsProps> = ({ texts, onTextsChange }) => {
    const handleTextChange = (index: number, value: string) => {
        const newTexts = [...texts];
        newTexts[index] = value;
        onTextsChange(newTexts);
    };

    const addTextInput = () => {
        onTextsChange([...texts, '']);
    };

    const removeTextInput = (index: number) => {
        const newTexts = texts.filter((_, i) => i !== index);
        onTextsChange(newTexts);
    };

    return (
        <div>
            <h2>Text Inputs</h2>
            <div>
                {texts.map((text, index) => (
                    <div key={index}>
                        <textarea
                            placeholder={`Enter text ${index + 1}`}
                            value={text}
                            onChange={(e) => handleTextChange(index, e.target.value)}
                            rows={2}
                        />
                        {texts.length > 1 && (
                            <button onClick={() => removeTextInput(index)} title="Remove text input">
                                &times;
                            </button>
                        )}
                    </div>
                ))}
            </div>
            <button onClick={addTextInput}>+ Add Text Input</button>
        </div>
    );
};

export default TextInputs;
