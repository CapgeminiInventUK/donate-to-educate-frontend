import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import routes from '@/config/routes';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import Layout from '../Layout/Layout';
import { Suspense } from 'react';
import { useMediaQuery } from 'react-responsive';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import Footer from '../Footer/Footer';
import { breakpoints } from '@utils/globals';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import { ConfigProvider } from 'antd';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
    },
  },
});

const App = (): JSX.Element => {
  const isMobile = useMediaQuery({ query: `(max-width: ${breakpoints.screenMedium})` });

  return (
    <ConfigProvider theme={{ hashed: false, token: { fontFamily: 'Poppins' } }}>
      <QueryClientProvider client={queryClient}>
        <Suspense>
          <ErrorBoundary name="Generic">
            <Router>
              <Routes>
                {routes.map(({ element, path, requiresAuth, redirectRoute }, index) => (
                  <Route
                    key={index}
                    element={
                      <Layout
                        page={
                          <ErrorBoundary name="Router">
                            {requiresAuth ? (
                              <PrivateRoute route={redirectRoute}>{element}</PrivateRoute>
                            ) : (
                              element
                            )}
                          </ErrorBoundary>
                        }
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
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ConfigProvider>
  );
};

export default App;
