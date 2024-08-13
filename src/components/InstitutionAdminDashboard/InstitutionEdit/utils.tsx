export const getButtonTextFromType = (type: string): string => {
  switch (type) {
    case 'tick':
      return 'Request products';
    case 'heart':
      return 'Donate products';
    case 'plus':
      return 'Take extra stock';
    default:
      throw new Error(`Unknown type ${type}`);
  }
};

export const getKeyFromType = (type: string): string => {
  switch (type) {
    case 'tick':
      return 'request';
    case 'heart':
      return 'donate';
    case 'plus':
      return 'excess';
    default:
      throw new Error(`Unknown type ${type}`);
  }
};

export const getPageContent = (
  type: string,
  institutionType: 'school' | 'charity'
): {
  banner: string;
  helpBannerTitle: string;
  helpBannerBody: JSX.Element;
  howItWorks: string;
  actionText: string;
} => {
  const schoolsCharitiesText =
    institutionType === 'school' ? 'schools, charities' : 'charities, schools';
  switch (type) {
    case 'tick':
      return {
        banner: 'Product requests',
        helpBannerTitle: 'Build your request products page',
        helpBannerBody: (
          <>
            <p>
              Tell your visitors what to expect when they request products. Include your collection
              or delivery times to manage their expectations. Select which products you have in
              stock and include details, if you need them.
            </p>
            <p>
              Donate to Educate will forward an email to you from visitors who want to request
              products.
            </p>
          </>
        ),
        actionText:
          "Once we have your request for the products you need, we'll contact you to arrange the next steps as soon as we can.",
        howItWorks:
          'View the products we have in stock. While we update our stock levels regularly, they may change daily.',
      };
    case 'heart':
      return {
        banner: 'Accept donations',
        helpBannerTitle: 'Build your donate products page',
        helpBannerBody: (
          <>
            <p>
              Select the products your {institutionType} needs so that the general public, other{' '}
              {schoolsCharitiesText} and volunteer groups know what to donate.
            </p>
            <p>
              Donate to Educate will forward an email to you from visitors who want to donate
              products.
            </p>
          </>
        ),
        actionText:
          "Once we have your message about the products you can donate, we'll contact you to arrange the next steps as soon as we can.",
        howItWorks:
          "View the products we need. When you select 'donate products', you can tell us how you can help.",
      };
    case 'plus':
      return {
        banner: 'Share extra stock',
        helpBannerTitle: 'Build your request products page',
        helpBannerBody: (
          <>
            <p>
              Select the products you have too much of so that the general public, other{' '}
              {schoolsCharitiesText} and volunteer groups can help share it with people that need
              it.
            </p>
            <p>
              Donate to Educate will forward an email to you from visitors who want to help take
              some of your extra stock.
            </p>
          </>
        ),
        actionText:
          "Once we know what extra stock you can take from us, we'll contact you to arrange the next steps as soon as we can.",
        howItWorks:
          'View the products we have too much of, take it from us and share it with people who need it.',
      };
    default:
      throw new Error(`Unknown type ${type}`);
  }
};
