import { FC } from 'react';
import Paths from '@/config/paths';
import RequestItems from '@/components/RequestItems/RequestItems';
import useLocationStateOrRedirect from '@/hooks/useLocationStateOrRedirect';
import { RequestItemsProps } from '@/types/props';
import { ItemsIconType } from '@/types/data';

const getTextContent = (
  type: string
): Omit<RequestItemsProps, 'organisationType' | 'id' | 'name'> => {
  switch (type) {
    case 'tick':
      return {
        type: 'tick',
        radioButtonLabels: [
          'I am a parent or guardian',
          'I work at another school',
          'I work for a charity or volunteer group',
          'Something else',
        ],
        radioButtonValues: [
          'parentGuardian',
          'anotherSchool',
          'charityVolunteerGroup',
          'somethingElse',
        ],
        buttonText: 'Request products',
        heading: 'Request school products',
        subHeading:
          "Tell us which things you need and we'll contact you to arrange the next steps as soon as we can.",
        notesHeading: 'Tell us what you need',
        notesSubHeading: 'Include the school products and sizes you would like',
      };
    case 'heart':
      return {
        type: 'heart',
        radioButtonLabels: [
          'I work for a charity or volunteer group',
          'I am a parent or guardian',
          'I am a member of the public',
          'I work at another school',
          'Something else',
        ],
        radioButtonValues: [
          'charityVolunteerGroup',
          'parentGuardian',
          'public',
          'anotherSchool',
          'somethingElse',
        ],
        buttonText: 'Donate products',
        heading: 'Donate school products',
        subHeading:
          "Tell us which things you'd like to donate and we'll contact you to arrange the next steps as soon as we can.",
        notesHeading: 'Tell us how you can help',
        notesSubHeading: '',
      };
    case 'plus':
      return {
        type: 'plus',
        radioButtonLabels: [
          'I work for a charity or volunteer group',
          'I am a parent or guardian',
          'I work at another school',
          'Something else',
        ],
        radioButtonValues: [
          'charityVolunteerGroup',
          'parentGuardian',
          'anotherSchool',
          'somethingElse',
        ],
        buttonText: 'Take extra stock',
        heading: 'Take extra stock',
        subHeading:
          "Tell us which things you'd like to take from us and we'll contact you to arrange the next steps as soon as we can.",
        notesHeading: 'Tell us how you can help',
        notesSubHeading: 'Include the school products you can take from us.',
      };
    default:
      throw new Error(`Unknown type ${type}`);
  }
};

const RequestSchoolProducts: FC = () => {
  const { state } = useLocationStateOrRedirect<{
    type: ItemsIconType;
    id: string;
    name: string;
    postcode?: string;
  }>(Paths.HOME);
  const { type, id, name, postcode } = state;
  return (
    <RequestItems
      {...getTextContent(type)}
      organisationType="school"
      id={id}
      name={name}
      postcode={postcode}
    />
  );
};

export default RequestSchoolProducts;
