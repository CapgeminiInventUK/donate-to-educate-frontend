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
    <QueryClientProvider client={queryClient}>
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
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
