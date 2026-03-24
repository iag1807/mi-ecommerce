import { useState, useEffect } from "react"
import { ProductCard } from "./components/ProductCard.jsx"

export const App = () => {

  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=100")
      .then(res => res.json())
      .then(data => {
        setProductos(data.products)
        setCargando(false)
      })
      .catch(() => {
        setError("Error al cargar productos")
        setCargando(false)
      })
  }, [])

  if (cargando) return <p>Cargando...</p>
  if (error) return <p>{error}</p>

  return (
    <div className="container">
      <h1 className="titulo">Mini Ecommerce</h1>
      <div className="grid">
        {productos.map(p => (
          <ProductCard key={p.id} producto={p} />
        ))}
      </div>
    </div>
  )
}