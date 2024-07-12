import { FC } from 'react';
import styles from './PublicDashboard.module.scss';
import ActionTile from '../ActionTile/ActionTile';
import { useNavigate } from 'react-router-dom';
import Paths from '@/config/paths';
import Hanger from '@/assets/school/Hanger';
import Heart from '@/assets/school/Heart';
import ExtraStock from '@/assets/school/ExtraStock';
import { ActionTileProps, PublicDashboardActionTilesProps } from '@/types/props';
import { ProfileItems } from '@/types/api';
import { returnObjectValueOrUndefined } from '@/utils/globals';
import { ActionTypes } from '@/types/data';

const PublicDashboardActionTiles: FC<PublicDashboardActionTilesProps> = ({
  request,
  donate,
  excess,
  type,
  organisationName,
  organisationId,
  previewMode,
  postcode,
}) => {
  const navigate = useNavigate();
  const getNavigateLinkFromType = (type: 'school' | 'charity'): string =>
    type === 'school' ? Paths.SCHOOLS_DASHBOARD_ITEMS : Paths.CHARITY_DASHBOARD_ITEMS;
  const profiles = { request, donate, excess };

  const handleOnClick = (profile?: ProfileItems | null): void => {
    navigate(getNavigateLinkFromType(type), {
      state: {
        type: 'tick',
        profile,
        name: organisationName,
        id: organisationId,
        previewMode,
        postcode,
      },
    });
  };

  const propsMap: Record<ActionTypes, ActionTileProps> = {
    request: {
      heading: 'Request products',
      subheading: 'Easily request school supplies for your children.',
      icon: <Hanger colour="white" />,
      theme: 'lightBlue',
      buttonText: 'Request',
      onClick: () => handleOnClick(request),
    },
    donate: {
      heading: 'Donate products',
      subheading: 'Help us by donating school supplies.',
      icon: <Heart colour="white" />,
      theme: 'midBlue',
      buttonText: 'Donate',
      onClick: () => handleOnClick(donate),
    },
    excess: {
      heading: 'Check extra stock',
      subheading: 'Share our extra products with the community.',
      icon: <ExtraStock colour="#050E33" />,
      theme: 'darkBlue',
      buttonText: 'Check extra stock',
      onClick: () => handleOnClick(excess),
    },
  };

  return (
    <div className={styles.tilesWrapper}>
      <div className={styles.productsTilesContainer}>
        {[ActionTypes.REQUEST, ActionTypes.DONATE, ActionTypes.EXCESS].map((profile) => {
          const { heading, subheading, icon, theme, buttonText, onClick } = propsMap[profile];
          return returnObjectValueOrUndefined(profile, profiles) ? (
            <ActionTile
              key={heading}
              heading={heading}
              subheading={subheading}
              icon={icon}
              theme={theme}
              buttonText={buttonText}
              onClick={onClick}
            />
          ) : (
            <></>
          );
        })}
      </div>
    </div>
  );
};
export default PublicDashboardActionTiles;
