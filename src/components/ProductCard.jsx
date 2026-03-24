import "../styles/ProductCard.css"

export const ProductCard = ({ producto }) => {

  const precioConDescuento =
    producto.price - (producto.price * producto.discountPercentage / 100)

  return (
    <div className="card">
      <img src={producto.thumbnail} />
      <h3>{producto.title}</h3>
      <p className="precio">Precio: ${producto.price}</p>
      <p className="descuento">Descuento: {producto.discountPercentage}%</p>
      <p className="final">Precio con descuento: ${precioConDescuento.toFixed(2)}</p>
      <p>⭐ {producto.rating}</p>
    </div>
  )
}