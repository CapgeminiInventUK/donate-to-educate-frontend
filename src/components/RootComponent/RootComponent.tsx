import DevPreview from '../../pages/DevPreview/DevPreview';
import App from '../App/App';

const RootComponent = process.env.NODE_ENV === 'development' ? DevPreview : App;

export default RootComponent;
