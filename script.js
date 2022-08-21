const goods = [
  {title: 'Shirt', price: 150},
  {title: 'Socks', price: 50},
  {title: 'Jacket', price: 350},
  {title: 'Shoes', price: 250},
];

const renderGoodsItem = (item) => `
    <div class="goods-list__item">
      <h3>${item.title}</h3>
      <div class="goods-list__info">
        <p class="goods-list__info__price">
          ${item.price} $
        </p>
        <p class="goods-list__info__text">
            Lorem ipsum dolor.
        </p>
      </div>
      <div class="goods-list__image-wrapper">              
      </div>
    </div>`;

const renderGoodsList = (list) =>
  document.querySelector('.goods-list').innerHTML = list
    .map(item => renderGoodsItem(item))
    .join('');

renderGoodsList(goods);
