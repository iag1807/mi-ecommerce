import "../styles/SearchBar.css"

export const SearchBar = ({ setBuscar }) => {
  return (
    <input
      type="text"
      placeholder="Buscar productos..."
      className="search"
      onChange={(e) => setBuscar(e.target.value)}
    />
  )
}