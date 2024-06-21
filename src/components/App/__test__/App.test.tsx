import { render, waitFor } from '@testing-library/react';
import App from '../App';

describe('App component', () => {
  it('should display App component when rendered', async () => {
    const { container } = render(<App />);
    await waitFor(() => {
      expect(container).toBeTruthy();
    });
  });
});
