import SchoolQuestion from '@/assets/Form/SchoolQuestion';
import LogoWhite from '@/assets/logo/LogoWhite';
import { ComponentType, type FormTemplate } from '@/types/data';

const getSummaryPageTemplate = (): FormTemplate => ({
  formComponents: [
    {
      componentType: ComponentType.SUMMARY,
      componentData: {
        icon: <SchoolQuestion />,
        header: 'Your application has been sent',
        subHeading: 'What happens next?',
        infoText: 'You will not receive a confirmation email',
        body: [
          'Your local authority or council will review your application.',
          'We will email you with the result of your application.',
          "If you're accepted, you will then need to create your profile",
        ],
        logo: <LogoWhite />,
      },
    },
  ],
});

export default getSummaryPageTemplate;
