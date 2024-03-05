import { ComponentType, DropdownOption, FormTemplate } from '@/types/data';
import getHappyPath from './happyPath';
import SchoolQuestion from '@/assets/Form/SchoolQuestion';
import LogoWhite from '@/assets/logo/LogoWhite';
import { Dispatch, SetStateAction } from 'react';

const getAuthorityNotRegisteredPath = (
  schoolOptions: DropdownOption[],
  cannotFindSchool: () => void,
  setPageNumber: Dispatch<SetStateAction<number>>
): FormTemplate[] => {
  const happyPath = getHappyPath(schoolOptions, cannotFindSchool);
  const onSend = (): void => {
    // eslint-disable-next-line no-console
    console.log('Message sent');
    setPageNumber((pageNumber) => pageNumber + 1);
  };
  const authorityNotRegisteredPath = [
    {
      header: 'Your local authority has not signed up to Donate to Educate',
      infoText: 'Not all local authorities have joined Donate to Educate yet.',
      infoTextTwo:
        'If you would like to tell us your details, we can look into this and get back to you.',
      formComponents: [
        {
          componentType: ComponentType.TEXT,
          componentData: {
            ariaLabel: 'name',
            header: 'Name',
            isLarge: true,
            formMeta: {
              page: 2,
              field: 'name',
            },
          },
        },
        {
          componentType: ComponentType.TEXT,
          componentData: {
            ariaLabel: 'email',
            header: 'Email',
            isLarge: true,
            formMeta: {
              page: 2,
              field: 'email',
            },
          },
        },
        {
          componentType: ComponentType.TEXTAREA,
          componentData: {
            ariaLabel: 'message',
            header: 'Message',
            isLarge: true,
            characterLimit: 1000,
            formMeta: {
              page: 2,
              field: 'message',
            },
          },
        },
      ],
      isUnhappyPath: true,
      onSend,
    },
    {
      formComponents: [
        {
          componentType: ComponentType.SUMMARY,
          componentData: {
            icon: <SchoolQuestion />,
            header: 'Thank you for letting us know',
            body: [
              'We will contact you when we know more about your local authority joining Donate to Educate.',
            ],
            logo: <LogoWhite />,
          },
        },
      ],
      isUnhappyPath: true,
    },
  ];
  return [happyPath[0], happyPath[1], ...authorityNotRegisteredPath];
};

export default getAuthorityNotRegisteredPath;
