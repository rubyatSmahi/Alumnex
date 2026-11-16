import { LinkTo } from './Button.styles';
const GetStartedButton = ({ padding, href = '/register' }) => {
    return (<LinkTo style={{
            padding: padding,
        }} href={href}>
      Get Started
    </LinkTo>);
};
export default GetStartedButton;
