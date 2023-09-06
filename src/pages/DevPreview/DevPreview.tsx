import React, { ComponentProps, useState } from 'react';
import Modal from 'react-modal';
import { Preview } from '@/components/DevPreview/Preview';

//--- Components
import TextInput from '@components/TextInput/TextInput';
import Button from '@components/Button/Button';
import Checkbox from '@/components/Checkbox/Checkbox';
//--- Components

//---Styles
import ButtonStyles from '@components/Button/Button.module.scss';
import CheckboxStyles from '@components/Checkbox/Checkbox.module.scss';
import DevPreviewStyles from './DevPreview.module.scss';
//---Styles

//--- Component props
import { TextInputProps, ValidationResult } from '@/types/props';
//--- Component props

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

  const buttonClassNames = Object.keys(ButtonStyles).filter(
    (className) => className !== 'disabled'
  );
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = (): void => {
    setModalIsOpen(true);
    setTimeout(() => {
      setModalIsOpen(false);
    }, 1000);
  };

  const handleCheckboxChange = (checked: boolean): void => {
    if (checked) {
      openModal();
    }
  };

  return (
    <div className={DevPreviewStyles.background}>
      <Preview<TextInputProps>
        Component={TextInput}
        componentName="TextInput"
        initialProps={{
          header: 'Type Error for error',
          validator: validator,
        }}
      />
      <Preview<TextInputProps>
        Component={TextInput}
        componentName="TextInput-Password"
        initialProps={{
          header: 'Type Error for error',
          validator: validator,
          password: true,
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
      <Preview<ComponentProps<typeof Checkbox>>
        Component={Checkbox}
        componentName="Checkbox"
        initialProps={{
          label: 'CheckBox',
          className: CheckboxStyles.checkbox,
          onChange: handleCheckboxChange,
        }}
      />
      <Modal isOpen={modalIsOpen}>
        <h2>Modal Shown</h2>
      </Modal>
    </div>
  );
};

export default DevPreview;
