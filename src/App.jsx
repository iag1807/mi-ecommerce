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
  const [orden, setOrden] = useState("none")

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
    .sort((a, b) => {
      if (orden === "precio-asc") return a.price - b.price
      if (orden === "precio-desc") return b.price - a.price
      if (orden === "rating-desc") return b.rating - a.rating
      return 0
    })

  return (
    <div className="container">
      <h1 className="titulo">Mini Ecommerce</h1>
      <SearchBar setBuscar={setBuscar} />
      <label className="checkbox">
        <input type="checkbox" onChange={(e) => setSoloDescuento(e.target.checked)} />
        Solo con descuento mayor al 10%
      </label>
      <div className="sort-bar">
        <span className="sort-label">Ordenar por:</span>
        <button className={`sort-btn ${orden === "none" ? "active" : ""}`} onClick={() => setOrden("none")}>Sin orden</button>
        <button className={`sort-btn ${orden === "precio-asc" ? "active" : ""}`} onClick={() => setOrden("precio-asc")}>Precio menor</button>
        <button className={`sort-btn ${orden === "precio-desc" ? "active" : ""}`} onClick={() => setOrden("precio-desc")}>Precio mayor</button>
        <button className={`sort-btn ${orden === "rating-desc" ? "active" : ""}`} onClick={() => setOrden("rating-desc")}>⭐ Mejor rating</button>
      </div>
      <CategoryFilter categoria={categoria} setCategoria={setCategoria} />
      <div className="grid">
        {productosFiltrados.map(p => (
          <ProductCard key={p.id} producto={p} />
        ))}
      </div>
    </div>
  )
}