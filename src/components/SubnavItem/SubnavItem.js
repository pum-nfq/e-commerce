import './SubnavItem.scss';

export default function SubnavItem(props) {
    const { href, title } = props;
    return (
        <li className="header__subnav-item">
            <a href={href} className="header__subnav-link">
                {title}
            </a>
        </li>
    );
}
