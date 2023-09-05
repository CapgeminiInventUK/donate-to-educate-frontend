import React from 'react';
import TextInput, { TextInputProps, ValidationResult } from '@components/TextInput/TextInput';
import { Preview } from '@/components/DevPreview/Preview';

const DevPreview: React.FC = () => {
  const validator: TextInputProps['validator'] = (input: string): ValidationResult => {
    if (input.toLowerCase() === 'error') {
      return {
        isValid: false,
        errorMessage: "Can't enter the word 'Error'",
      };
    }
    return { isValid: true };
  };

  return (
    <div>
      <h1>Development Preview</h1>
      <Preview<TextInputProps>
        Component={TextInput}
        componentName="TextInput"
        initialProps={{
          header: 'Test Header',
          validator: validator,
        }}
      />
    </div>
  );
};

export default DevPreview;
