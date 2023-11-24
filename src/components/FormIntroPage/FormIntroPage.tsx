import { FC } from 'react';

interface Props {
  header: string;
  infoText: string;
  listItems: string[];
  secondaryHeading?: string;
  secondaryInfoText: string;
  secondaryListItems: string[];
}

const FormIntroPage: FC<Props> = ({
  header,
  //   infoText,
  //   listItems,
  //   secondaryHeading,
  //   secondaryInfoText,
  //   secondaryListItems,
}) => {
  return (
    <div>
      <h1>{header}</h1>
    </div>
  );
};
export default FormIntroPage;
