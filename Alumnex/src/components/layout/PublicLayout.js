'use client';
import { ReactLenis } from '@studio-freight/react-lenis';
import StyledComponentsRegistry from '@/lib/registry';
import { GlobalStyles } from './GlobalStyles';
import Footer from './Footer';
import Header from './Header';
import { usePathname } from 'next/navigation';
const Layout = ({ children }) => {
    const pathname = usePathname();
    const isDashboard = /^\/(admin|alumni|student)(\/|$)/.test(pathname);
    return (<StyledComponentsRegistry>
      <ReactLenis root easing={(t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))}>
        <GlobalStyles />
        <div>
          {!isDashboard && <Header />}
          {children}
          {!isDashboard && <Footer />}
        </div>
      </ReactLenis>
    </StyledComponentsRegistry>);
};
export default Layout;
