import Image from 'next/image';
import alumnexIcon from '../../../public/images/alumnex-icon.png';

const AlumnexIcon = ({ size = 46, priority = false, className }) => (
    <Image
        src={alumnexIcon}
        alt="Alumnex academic shield"
        width={size}
        height={size}
        priority={priority}
        className={className}
    />
);

export default AlumnexIcon;
