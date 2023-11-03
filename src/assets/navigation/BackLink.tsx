import { Link } from 'react-router-dom';
import { BackLinkProps } from '@/types/props';

const BackLink = ({ route }: BackLinkProps): JSX.Element => <Link to={route}>Back</Link>;

export default BackLink;
