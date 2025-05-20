import './App.css'
import ProductDetailPage from './Component/ProductDetailPage/ProductDetailPage';
import {article} from './article'


function App() {

  return (
    <>
      <ProductDetailPage data={article}/>
    </>
  )
}

export default App
