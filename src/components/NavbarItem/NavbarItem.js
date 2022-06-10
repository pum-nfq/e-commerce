import SubnavItem from "../SubnavItem/SubnavItem";
import "./NavbarItem.scss";

export default function NavbarItem(props) {
  const { href, title, haveSubnav = false, subnavFeature = [] } = props;
  return (
    <li className="header__menu-item">
      <a href={href} className="header__item-link">
        {title}
      </a>
      {haveSubnav && (
        <ul className="header__subnav">
          {subnavFeature.map((subnav, index) => {
            return (
              <SubnavItem key={index} href={subnav.href} title={subnav.title} />
            );
          })}
        </ul>
      )}
    </li>
  );
}
