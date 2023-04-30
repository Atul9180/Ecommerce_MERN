import React,{useState,useEffect} from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import { useParams,useNavigate } from 'react-router-dom'



const CategoryProducts = () => {
  const params=useParams();
  const navigate=useNavigate();
  const [products,setProducts]=useState([])
  const [category,setCategory]=useState({})
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);


  //get categoyProducts:
  const getProductsByCategory =async ()=>{
    try{
      setLoading(true)
      const {data}=await axios.get(`/api/v1/products/product-category/${params.slug}`)
      setLoading(false)
      setProducts(data?.categoryProducts)
      setTotal(data?.categoryProducts?.length)
      setCategory(data?.category)

    }
    catch(error){
      setLoading(false)
      console.log(error)
    }
  }
  

useEffect(()=>{
 if(params?.slug) getProductsByCategory();
},[params?.slug])

useEffect(()=>{
    if(page===1) return ;
    loadMoreProducts();
  },[page])

  
//load more Products
  const loadMoreProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/products/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };



  return (
    <Layout>
      <div className='container mt-3 '>
      <h4 className='text-center'>Category - {category?.name}</h4>
      <h6 className='text-center'>{products?.length} results found</h6>
      <div className='row'>
        <div className="d-flex flex-wrap">
            {products?.map((p) => (
            <div className="card m-2" key={p._id} style={{width:'18rem'}}>
                <img src={`/api/v1/products/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                <div className="card-body">
                  <h5 className="card-title text-center">{p.name}</h5>
                  <p class="card-text">{p.description.substring(0,30)}...</p>
                  <p class="card-text text-center"><b>Price:</b> ${p.price}</p>
                  <button className="btn btn-primary ms-1" 
                  onClick={()=>navigate(`/product/${p.slug}`)}>More Details</button>
                  <button className="btn btn-secondary ms-1">Add to Cart</button>
                </div>
              </div>
          ))}
          </div>

          {/* PAGINATION */}
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Loadmore"}
              </button>
            )}
          </div>
      </div>
      </div>
   

    </Layout>
  )
}

export default CategoryProducts