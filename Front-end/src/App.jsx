import { BrowserRouter } from 'react-router-dom';
import { Router } from './Router';
import { AppProvider } from './utils/AppContext';

export function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Router />
      </AppProvider>
    </BrowserRouter>
  );
}


