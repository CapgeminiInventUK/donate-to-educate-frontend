import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import routes from '@/config/routes';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import Layout from '../Layout/Layout';
import { Suspense, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import Footer from '../Footer/Footer';
import { breakpoints } from '@utils/globals';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import { ConfigProvider } from 'antd';
import ErrorBoundaryWithLocation from '../ErrorBoundary/ErrorBoundaryWithLocation';
import ScrollToTop from '../ScrollToTop/ScrollToTop';
import { useStore } from '@/stores/useStore';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});

const App = (): JSX.Element => {
  const isMobile = useMediaQuery({ query: `(max-width: ${breakpoints.screenMedium})` });

  useEffect(() => {
    void useStore.getState().getCurrentUser();
  }, []);

  return (
    <>
      <ConfigProvider theme={{ hashed: false, token: { fontFamily: 'Poppins' } }}>
        <QueryClientProvider client={queryClient}>
          <Suspense>
            <ErrorBoundary name="Generic">
              <Router>
                <ScrollToTop />
                <Routes>
                  {routes.map(({ element, path, authType, redirectRoute }, index) => (
                    <Route
                      key={index}
                      element={
                        <Layout
                          page={
                            <ErrorBoundaryWithLocation name="Router">
                              {authType !== undefined ? (
                                <PrivateRoute route={redirectRoute} authType={authType}>
                                  {element}
                                </PrivateRoute>
                              ) : (
                                element
                              )}
                            </ErrorBoundaryWithLocation>
                          }
                          header={isMobile ? <Sidebar /> : <Navbar />}
                          footer={<Footer />}
                        />
                      }
                      path={path}
                    />
                  ))}
                </Routes>
                {/* <CookieBanner /> */}
              </Router>
            </ErrorBoundary>
          </Suspense>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ConfigProvider>
    </>
  );
};

export default App;
