import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import routes from '../../config/routes';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import Layout from '../Layout/Layout';
import { Suspense } from 'react';
import { useMediaQuery } from 'react-responsive';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import Footer from '../Footer/Footer';
import { breakpoints } from '../../utils/globals';

const App = (): JSX.Element => {
  const isMobile = useMediaQuery({ query: `(max-width: ${breakpoints.screenMedium})` });

  return (
    <Suspense>
      <ErrorBoundary>
        <Router>
          <Routes>
            {routes.map(({ element, path }, index) => (
              <Route
                key={index}
                element={
                  <Layout
                    page={element}
                    header={isMobile ? <Sidebar /> : <Navbar />}
                    footer={<Footer />}
                  />
                }
                path={path}
              />
            ))}
          </Routes>
        </Router>
      </ErrorBoundary>
    </Suspense>
  );
};

export default App;
