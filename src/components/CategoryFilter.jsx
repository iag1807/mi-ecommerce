import "../styles/CategoryFilter.css"

export const CategoryFilter = ({ categoria, setCategoria }) => {

  const categorias = [
    { valor: "all", etiqueta: "Todas" },
    { valor: "beauty", etiqueta: "Maquillaje" },
    { valor: "fragrances", etiqueta: "Perfumes" },
    { valor: "laptops", etiqueta: "Laptops" },
    { valor: "mobile-accessories", etiqueta: "Accesorios Moviles" },
    { valor: "furniture", etiqueta: "Muebles" },
    { valor: "home-decoration", etiqueta: "Decoracion del hogar" },
    { valor: "kitchen-accessories", etiqueta: "Accesorios de cocina" },
    { valor: "groceries", etiqueta: "Comida" },
  ]

  return (
    <div className="categorias">
      <h1 className="titulo">Categorias</h1>
      {categorias.map(c => (
        <button
          key={c.valor}
          className={categoria === c.valor ? "active" : ""}
          onClick={() => setCategoria(c.valor)}
        >
          {c.etiqueta}
        </button>
      ))}
    </div>
  )
}