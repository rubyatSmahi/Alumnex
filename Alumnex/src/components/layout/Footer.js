import Image from 'next/image';
import Link from 'next/link';
import AlumnexLogo from './AlumnexLogo';
import ic_chevron_down from '../../../public/svgs/ic_chevron_down.svg';
import ic_copyright from '../../../public/svgs/ic_copyright.svg';
const linksArr = [
    {
        title: 'Community',
        links: [
            { label: 'Directory', href: '/alumni-directory' },
            { label: 'Success stories', href: '/success-stories' },
            { label: 'Events', href: '/events' },
        ],
    },
    {
        title: 'Resources',
        links: [
            { label: 'Mentorship', href: '/student/mentorship' },
            { label: 'Jobs', href: '/jobs' },
            { label: 'Careers', href: '/alumni/career' },
        ],
    },
    {
        title: 'Company',
        links: [
            { label: 'About us', href: '/about' },
            { label: 'Contact', href: '/contact' },
            { label: 'FAQ', href: '/#faq' },
        ],
    },
];
import { Wrapper, Inner, FooterLogo, FooterMainContent, FooterMiddle, FooterCallout, TextCtn, FooterNavigation, GridColumn, LinksContainer, FooterBottom, Translator, CopyRight, } from './Footer.styles';
const Footer = () => {
    return (<Wrapper>
      <Inner>
        <FooterLogo>
          <AlumnexLogo />
        </FooterLogo>
        <FooterMainContent>
          <FooterMiddle>
            <FooterCallout>
              <TextCtn>
                <p>Stay connected to your university community on any device.</p>
              </TextCtn>
            </FooterCallout>
            <FooterNavigation>
              {linksArr.map((l, i) => (<GridColumn key={i}>
                  <h3>{l.title}</h3>
                  <LinksContainer>
                    {l.links.map((link) => (<li key={link.href}><Link href={link.href}>{link.label}</Link></li>))}
                  </LinksContainer>
                </GridColumn>))}
            </FooterNavigation>
          </FooterMiddle>
          <FooterBottom>
            <Translator>
              <h3>English (United Kingdom)</h3>
              <Image src={ic_chevron_down} alt="chevron down"/>
            </Translator>
            <CopyRight>
              <Image src={ic_copyright} alt="copyright svg"/>
              Alumnex University Network.
            </CopyRight>
          </FooterBottom>
        </FooterMainContent>
      </Inner>
    </Wrapper>);
};
export default Footer;
