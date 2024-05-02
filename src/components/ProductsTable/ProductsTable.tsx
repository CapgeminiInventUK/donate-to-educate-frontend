import { FC, Fragment } from 'react';
import { InstituteSearchResult } from '@/types/api';
import { Table, Popover } from 'antd';
import { FilterFilled } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import { convertMetersToMiles } from '@/utils/distance';
import Button from '@/components/Button/Button';
import minusIcon from '@/assets/icons/minusIcon.svg';
import tickIcon from '@/assets/icons/tickIcon.svg';
import ProductTypeIcon from '@/components/ProductTypeIcon/ProductTypeIcon';
import { convertNumberToCategory } from '@/components/ItemList/getFullItemList';
import { useNavigate } from 'react-router-dom';
import NoLocalOrganisations from '@/components/NoLocalOrganisations/NoLocalOrganisations';
import Paths from '@/config/paths';
import styles from './ProductsTable.module.scss';

interface ProductsTableProps {
  tableData: InstituteSearchResult[];
  type: 'school' | 'charity';
  productsColumnHeader:
    | 'Product types available'
    | 'Excess stock product types'
    | 'Product types needed';
}

const ProductsTable: FC<ProductsTableProps> = ({ tableData, type, productsColumnHeader }) => {
  const dashboardLink = type === 'school' ? Paths.SCHOOLS_DASHBOARD : Paths.CHARITY_DASHBOARD;
  const navigate = useNavigate();
  const columns: ColumnsType<InstituteSearchResult> = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text: string, { name, id, registered }: InstituteSearchResult) =>
        registered || type === 'charity' ? (
          <Button
            key={id}
            className={styles.nameBtn}
            theme="link-blue"
            text={text}
            ariaLabel={`name-${text}`}
            onClick={() => navigate(dashboardLink, { state: { urn: id, name, id } })}
          />
        ) : (
          text
        ),
    },
    {
      title: 'Distance',
      dataIndex: 'distance',
      render: (text: string) => `${convertMetersToMiles(text)} miles`,
    },
    {
      title: productsColumnHeader,
      dataIndex: 'productTypes',
      render: (text: number[], { registered, id }: InstituteSearchResult): JSX.Element[] => {
        if (!registered && type === 'school') {
          return [<Fragment key={id}>N/A</Fragment>];
        }
        return text.map((productType) => (
          <ProductTypeIcon key={productType} productType={productType} />
        ));
      },
      filters: Array.from(Array(5)).map((_, index) => ({
        text: convertNumberToCategory(index),
        value: index,
      })),
      onFilter: (value, record): boolean => record.productTypes.includes(Number(value)),
    },
  ];

  if (type === 'school') {
    columns.splice(1, 0, {
      title: 'Status',
      dataIndex: 'registered',
      filters: [
        {
          text: 'Joined',
          value: true,
        },
        {
          text: 'Not Joined',
          value: false,
        },
      ],
      render: (registered: boolean, { id }) => (
        <div key={id} className={styles.statusDiv}>
          <Popover
            content={registered ? 'Registered' : 'Not yet registered'}
            trigger="hover"
            className={`${styles.status} ${registered ? styles.joined : ''}`}
          >
            <span>
              {registered ? (
                <img src={tickIcon} alt="Joined" />
              ) : (
                <img src={minusIcon} alt="Not joined" />
              )}
            </span>
          </Popover>
        </div>
      ),
      onFilter: (value: boolean | React.Key, record: InstituteSearchResult): boolean =>
        record.registered === value,
      filterIcon: () => <FilterFilled className={styles.filterIcon} />,
      defaultFilteredValue: ['true'],
    });
  }

  return (
    <Table
      dataSource={tableData}
      columns={columns}
      scroll={{ x: 'max-content' }}
      rowKey="id"
      locale={
        type === 'charity'
          ? {
              emptyText: <NoLocalOrganisations />,
            }
          : {}
      }
    />
  );
};
export default ProductsTable;
