import React, { useState } from 'react';
import TextInput, { TextInputProps, ValidationResult } from '@components/TextInput/TextInput';
import Button from '@components/Button/Button';
import styles from '@components/Button/Button.module.scss';
import Modal from 'react-modal';

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

  const buttonClassNames = Object.keys(styles).filter((className) => className !== 'disabled');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = (): void => {
    setModalIsOpen(true);
    setTimeout(() => {
      setModalIsOpen(false);
    }, 1000);
  };

  return (
    <div>
      <Preview<TextInputProps>
        Component={TextInput}
        componentName="TextInput"
        initialProps={{
          header: 'Test Header',
          validator: validator,
        }}
      />
      {buttonClassNames.map((className) => (
        <Preview<ComponentProps<typeof Button>>
          key={className}
          Component={Button}
          componentName={`Button ${className}`}
          initialProps={{
            onClick: openModal,
            text: className,
            theme: className,
          }}
        />
      ))}
      <Modal isOpen={modalIsOpen}>
        <h2>Clicked</h2>
      </Modal>
    </div>
  );
};

export default DevPreview;
