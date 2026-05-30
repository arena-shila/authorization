import React, { useState, useEffect } from 'react'

function Product() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
  try {
    const res = await fetch(
      "http://localhost:3000/api/products"
    );

    const data = await res.json();

    setProducts(data);
  } catch (error) {
    console.log(error);
  }
};
  return (
    <>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
  {products.map((product) => (
    <div
      key={product._id}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-80 object-cover"
      />

      <div className="p-4">
        <h2 className="font-semibold text-lg">
          {product.name}
        </h2>

        <p className="text-pink-600 font-bold mt-2">
          ₹{product.price}
        </p>

        <button className="mt-4 w-full bg-black text-white py-2 rounded-lg">
          Add To Cart
        </button>
      </div>
    </div>
  ))}
</div>
      
    </>
  )
}

export default Product
