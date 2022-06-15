import "./SearchList.scss";

export default function SearchList(props) {
  const { searchProducts = [] } = props;
  return (
    <>
      <div className="searchList__container">
        <ul className="searchList__list">
          {searchProducts.map((item, index) => {
            return (
              <li key={index} className="searchList__item">
                <a href="#" className="searchList__item-link">
                  <img
                    src={item.image}
                    alt="sneakers img"
                    className="searchList__img"
                  />
                  <div className="searchList__info">
                    <p className="searchList__name">{item.name}</p>
                    <p className="searchList__brand">{item.brand}</p>
                    <p className="searchList__price">{item.price}</p>
                  </div>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}