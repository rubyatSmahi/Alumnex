'use client';
import { ReactLenis } from '@studio-freight/react-lenis';
import StyledComponentsRegistry from '@/lib/registry';
import { GlobalStyles } from './GlobalStyles';
import Footer from './Footer';
import Header from './Header';
const Layout = ({ children }) => {
    return (<StyledComponentsRegistry>
      <ReactLenis root easing={(t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))}>
        <GlobalStyles />
        <div>
          <Header />
          {children}
          <Footer />
        </div>
      </ReactLenis>
    </StyledComponentsRegistry>);
};
export default Layout;
