import { useState, useEffect } from "react"
import { ProductCard } from "./components/ProductCard.jsx"
import { SearchBar } from "./components/SearchBar.jsx"
import { CategoryFilter } from "./components/CategoryFilter.jsx"

export const App = () => {

  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [categoria, setCategoria] = useState("all")
  const [soloDescuento, setSoloDescuento] = useState(false)
  const [buscar, setBuscar] = useState("")

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

  const productosFiltrados = productos
    .filter(p => categoria === "all" || p.category === categoria)
    .filter(p => !soloDescuento || p.discountPercentage > 10)
    .filter(p => p.title.toLowerCase().includes(buscar.toLowerCase()))

  return (
    <div className="container">
      <h1 className="titulo">Mini Ecommerce</h1>
      <SearchBar setBuscar={setBuscar} />
      <label className="checkbox">
        <input type="checkbox" onChange={(e) => setSoloDescuento(e.target.checked)} />
        Solo con descuento mayor al 10%
      </label>
      <CategoryFilter setCategoria={setCategoria} />
      <div className="grid">
        {productosFiltrados.map(p => (
          <ProductCard key={p.id} producto={p} />
        ))}
      </div>
    </div>
  )
}