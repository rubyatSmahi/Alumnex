'use client';
import Image from 'next/image';
import { Wrapper, Inner, LogoContainer, Nav, CallToActions, BurgerMenu } from './Header.styles';
import ic_bars from '../../../public/svgs/ic_bars.svg';
import GetStartedButton from '@/components/ui/Button';
import AnimatedLink from '@/components/ui/AnimatedLink';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { links, menu } from './Header.constants';
import AlumnexLogo from './AlumnexLogo';
const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (<Wrapper>
      <Inner>
        <LogoContainer>
          <AlumnexLogo priority />
          <BurgerMenu type="button" aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={isOpen} aria-controls="primary-navigation" onClick={() => setIsOpen(!isOpen)}>
            <motion.div variants={menu} animate={isOpen ? 'open' : 'closed'} initial="closed"></motion.div>
            <Image src={ic_bars} alt="" aria-hidden="true"/>
          </BurgerMenu>
        </LogoContainer>
        <Nav id="primary-navigation" className={isOpen ? 'active' : ''}>
          {links.map((link, i) => (<AnimatedLink key={i} title={link.linkTo} href={link.url} onNavigate={() => setIsOpen(false)}/>))}
        </Nav>
        <CallToActions className={isOpen ? 'active' : ''}>
          <AnimatedLink title="Login" href="/login" onNavigate={() => setIsOpen(false)}/>
          <GetStartedButton padding="0.5rem 0.75rem"/>
        </CallToActions>
      </Inner>
    </Wrapper>);
};
export default Header;
