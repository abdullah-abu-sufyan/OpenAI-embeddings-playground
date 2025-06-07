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
        <div className='grid gap-5'>
            <h2 className='!font-medium'>Text Inputs</h2>
            <div className='grid gap-5'>
                {texts.map((text, index) => (
                    <div key={index} className='w-full flex gap-5'>
                        <textarea
                            placeholder={`Enter text ${index + 1}`}
                            value={text}
                            onChange={(e) => handleTextChange(index, e.target.value)}
                                       className='w-full'

                        />
                        {texts.length > 1 && (
                            <button onClick={() => removeTextInput(index)} title="Remove text input" className='bg-red-200 my-auto !rounded-full !px-3 !py-1'>
                                &times;
                            </button>
                        )}
                    </div>
                ))}
            </div>
            <button onClick={addTextInput} className='w-fit !px-4'>+ Add Text Input</button>
        </div>
    );
};

export default TextInputs;
