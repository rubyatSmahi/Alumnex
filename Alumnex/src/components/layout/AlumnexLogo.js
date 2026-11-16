import AlumnexIcon from './AlumnexIcon';
import AlumnexWordmark from './AlumnexWordmark';
import { LogoLink, IconFrame } from './AlumnexLogo.styles';

const AlumnexLogo = ({ className, priority = false }) => (
    <LogoLink href="/" className={className} aria-label="Alumnex home">
        <IconFrame>
            <AlumnexIcon size={46} priority={priority} />
        </IconFrame>
        <AlumnexWordmark />
    </LogoLink>
);

export default AlumnexLogo;
