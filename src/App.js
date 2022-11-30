// routes
import Snowfall from 'react-snowfall'
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ThemeSettings from './components/settings';
import { ChartStyle } from './components/chart';
import ScrollToTop from './components/ScrollToTop';
import { ProgressBarStyle } from './components/ProgressBar';
import NotistackProvider from './components/NotistackProvider';
import MotionLazyContainer from './components/animate/MotionLazyContainer';


// ----------------------------------------------------------------------

export default function App() {
  (async function test(){
    setTimeout(async() => {
    await window.api.getWebTitle(document.title)
  }, 5000)
  })();
  return (
    
    <MotionLazyContainer>
      <ThemeProvider>
        <ThemeSettings>
          <NotistackProvider>
          <Snowfall/>
            <ProgressBarStyle />
            <ChartStyle />
            <ScrollToTop />
            
            <Router />
          </NotistackProvider>
        </ThemeSettings>
      </ThemeProvider>
    </MotionLazyContainer>
  );
}
