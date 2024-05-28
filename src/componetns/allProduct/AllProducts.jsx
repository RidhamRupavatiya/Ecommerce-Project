import React from 'react';
import Layout from '../layout/Layout';
import ProductCard from '../productCard/ProductCard';
import Filter from '../filter/Filter';

const AllProducts = () => {
  return (
    <Layout>
      <Filter/>
      <ProductCard/>
    </Layout>
  )
}

export default AllProducts
