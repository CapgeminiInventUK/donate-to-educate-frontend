import { FC } from 'react';
import ActionTile from '@/components/ActionTile/ActionTile';
import Hanger from '@/assets/school/Hanger';
import Heart from '@/assets/school/Heart';
import ExtraStock from '@/assets/school/ExtraStock';
import styles from '../InstitutionAdminDashboard.module.scss';
import { ActionTilesProps } from '@/types/props';
import Paths from '@/config/paths';
import { useNavigate } from 'react-router-dom';
import { ProfileItems } from '@/types/api';

const ActionTiles: FC<ActionTilesProps> = ({ profile, type }) => {
  const { donate, excess, request, postcode, name: organisationName, id } = profile;
  const navigate = useNavigate();

  const onTileClick = (iconType: string, profile?: ProfileItems | null): void => {
    navigate(type === 'school' ? Paths.SCHOOL_EDIT : Paths.CHARITIES_EDIT, {
      state: {
        type: iconType,
        profile,
        name: organisationName,
        id,
        postcode,
      },
    });
  };

  return (
    <div className={styles.tilesWrapper}>
      <div className={styles.productsTilesContainer}>
        <ActionTile
          heading="Product requests"
          subheading="Allow visitors to request products from you."
          icon={<Hanger colour="white" />}
          theme={request ? 'lightBlue' : 'grey'}
          isAdmin={true}
          buttonText={request ? 'Edit products' : 'Enable requests'}
          onClick={() => onTileClick('tick', request)}
        />
        <ActionTile
          heading="Accept donations"
          subheading="Allow visitors to donate products to you."
          icon={<Heart />}
          theme={donate ? 'midBlue' : 'grey'}
          isAdmin={true}
          buttonText={donate ? 'Edit donations' : 'Enable donations'}
          onClick={() => onTileClick('heart', donate)}
        />
        <ActionTile
          heading="Share extra stock"
          subheading="Allow schools and charities to take extra stock off your hands."
          icon={<ExtraStock colour={excess ? '#050E33' : '#FEFCFD'} />}
          theme={excess ? 'darkBlue' : 'grey'}
          isAdmin={true}
          buttonText={excess ? 'Edit extra stock' : 'Enable sharing'}
          onClick={() => onTileClick('plus', excess)}
        />
      </div>
    </div>
  );
};
export default ActionTiles;
