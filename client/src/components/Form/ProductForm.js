import React from 'react'

const ProductForm = ({handleSubmit,value,setValue}) => {
  return (
     <>
    <form onSubmit={handleSubmit}>
  <div className="mb-3"> 
    <input type="text" className="form-control" placeHolder="Enter new Product name" value={value} onChange={(e)=>setValue(e.target.value)} />
    <input type="text" className="form-control" placeHolder="Enter Product description" value={value} onChange={(e)=>setValue(e.target.value)} />
    <input type="number" className="form-control" placeHolder="Enter Product price" value={value} onChange={(e)=>setValue(e.target.value)} />
    <input type="text" className="form-control" placeHolder="Enter Product category" value={value} onChange={(e)=>setValue(e.target.value)} />
    <input type="number" className="form-control" placeHolder="Enter Product quantity" value={value} onChange={(e)=>setValue(e.target.value)} />
    <input type="text" className="form-control" placeHolder="Enter Product shipping" value={value} onChange={(e)=>setValue(e.target.value)} />
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </>
  )
}

export default ProductForm