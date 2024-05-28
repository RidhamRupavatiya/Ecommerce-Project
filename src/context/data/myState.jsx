import React, { useEffect, useState } from 'react';
import MyContext from './myContext';
import {  QuerySnapshot, Timestamp, addDoc, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { fireDB } from '../../firebase/FirebaseConfig';
const myState = (props) => {

  // dark or light mode :-
  const [mode, setMode] = useState('light');

  const toggleMode = () => {
    if(mode === 'light'){
      setMode('dark');
      document.body.style.backgroundColor = "rgb(17, 24, 39)";
    }
    else{
      setMode('light');
      document.body.style.backgroundColor = "white";
    }
  } 

    // loading :-
    const [loading, setLoading] = useState(false);

    // Product Object :-
    const [products, setProducts] = useState({
      title: null,
      price: null,
      imageUrl: null,
      category: null,
      description: null,
      time: Timestamp.now(),
      date: new Date().toLocaleString(
        "en-US",
        {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }
      )
    });

    // ********** Add Product ************
    const addProduct = async () => {
      if(products.title == null || products.price == null || products.imageUrl == null || products.category == null || 
        products.description == null)
        {
          return toast.error("All fields are required..!")
        }

        setLoading(true);

        try {
          const productRef = collection(fireDB, 'products');
          await addDoc(productRef, products);
          toast.success("Add product successfully");
          setInterval(()=>{
            window.location.href = '/dashboard'
          },1700)
          getProductData();
          setLoading(false)
          
        } catch (error) {
         console.log(error); 
         setLoading(false)
        }
    }

    // ***** Get Product ********
    const [product, setProduct] = useState([]);

    const getProductData = async () => {

      setLoading(true)

      try {
        const q = query(
          collection(fireDB, 'products'),
          orderBy('time')
        );
        
        const data = onSnapshot(q, (QuerySnapshot) => {
          let productArray = [];
          QuerySnapshot.forEach((doc)=>{
            productArray.push({...doc.data(),id: doc.id})
          });
          setProduct(productArray);
          setLoading(false);
        }) 
        
        return () => data;

      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }

    useEffect(() => {
      getProductData();
    },[]);

    // ******* update Product ******** //
    const edithandle  = (item) => {
      setProducts(item)
    }

    const updateProduct = async (item) => {
      setLoading(true)
      try {
        await setDoc(doc(fireDB, "products", products.id), products);
        toast.success('Produ update successfullt..!')
        getProductData();
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 1800);
        setLoading(false)
      } catch (error) {
       console.log(error);
       setLoading(false)
      }
    }

    // ********* delete Product *********//
    const deleteProduct = async (item) => {
      setLoading(true)
      try {
        await deleteDoc(doc(fireDB, "products", item.id))
        toast.success("Product Deleted Successfully..!")
        getProductData();
        setLoading(false);

      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
    
    // Order Product
    const [order, setOrder] = useState([]);

    const getOrderData = async () => {
      setLoading(true);
      try {
        const result = await getDoc(collection(fireDB, "orders"))
        const ordersArray = [];
        result.forEach(doc => {
          ordersArray.push(doc.data());
          setLoading(false)
        });
        setOrder(ordersArray);
        console.log(ordersArray);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false)
      }
    }
  
    
    // user Data
    const [user, setUser] = useState([]);
    
    const getUserData = async () => {
      setLoading(true)
      try {
        const result = await getDocs(collection(fireDB, "users"))
        const userArray = [];
        result.forEach((doc) => {
          userArray.push(doc.data());
          setLoading(false)
        });
        setUser(userArray);
        console.log(userArray);
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.log(error);
      }
    }
    
    useEffect(()=>{
      getOrderData();
      getUserData();
    },[])

  const [searchkey, setSearchkey] = useState('')
  const [filterType, setFilterType] = useState('')
  const [filterPrice, setFilterPrice] = useState('')


    return (
      <MyContext.Provider value={{
      mode, toggleMode, 
      loading, setLoading,
      products, setProducts, addProduct, product,
      edithandle, updateProduct, 
      deleteProduct,
      order,
      user,
      searchkey, setSearchkey,
      filterType, setFilterType,
      filterPrice, setFilterPrice
    }}>
      {props.children}
    </MyContext.Provider>
  );
}

export default myState