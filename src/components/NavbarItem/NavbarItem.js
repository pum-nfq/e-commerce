import SubnavItem from "../SubnavItem/SubnavItem";
import "./NavbarItem.scss";
import { Link } from "react-router-dom";

export default function NavbarItem(props) {
    const { href, title, haveSubnav = false, subnavFeature = [] } = props;
    return (
        <li className="header__menu-item">
            <Link to={href} className="header__item-link">
                {title}
            </Link>
            {haveSubnav && (
                <ul className="header__subnav">
                    {subnavFeature.map((subnav, index) => {
                        return (
                            <SubnavItem
                                key={index}
                                href={subnav.href}
                                title={subnav.title}
                            />
                        );
                    })}
                </ul>
            )}
        </li>
    );
}
