import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import AOS from "aos";
import "aos/dist/aos.css";

// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';


AOS.init({
  once:true
});
// ----------------------------------------------------------------------

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          <ScrollToTop />
          <StyledChart />
          <Router />
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}
