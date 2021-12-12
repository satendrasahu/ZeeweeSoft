import React, { useEffect, useState } from 'react'
import PersistentDrawerLeft from './components/Navigation'
import { Product } from './components/Product'
import './App.css'
import { Switch,Route } from 'react-router'
import { Home } from './components/Home.jsx'
import { Cart } from './components/CartComponents/Cart'
import PersistentDrawerSmall from './components/MobNav'
import LoginPage from './Pages/Auth/Login'
import { Register } from './Pages/Auth/Register'
import { OrderPage } from './Pages/Order/OrderPage'
import { AllOrderPage } from './Pages/Order/AllOrderPage'
import { getRole, isUserLoggedIn } from './Pages/Auth/hepler'
import { useHistory } from "react-router-dom";
import { NewOrderPage } from './Pages/Order/NewOrderPage'
/**
* @author
* @function App
**/

const useWindowSize = ()=>
{
  const [size, setSize] = useState([window.innerHeight,window.innerWidth])
  useEffect(()=>{
    const handelResize = () => {
      setSize([window.innerHeight,window.innerWidth]);
          }
          window.addEventListener("resize",handelResize);
          return()=>{
            window.removeEventListener("resize",handelResize)
          }
  },[])
  return size
}

 const App = (props) => {
  const [height, width] = useWindowSize();
  const userType = getRole()
  const isLoggedIN =isUserLoggedIn()
  const history = useHistory()
  // const [width] = useWindowSize();
  
  return(
    <>
    {width <800 ? <PersistentDrawerSmall/>:<PersistentDrawerLeft/>}
    
      
    <Switch>
      <Route exact path ="/" component={Home}/>
      <Route exact path ="/products" component={()=>
      userType === "Admin"?<Product/> : <Home/>}/>
      <Route exact path ="/cart" component={Cart}/>
      <Route exact path ="/login" component={LoginPage}/>
      <Route exact path ="/register" component={Register}/>
      <Route exact path ="/order" 
      component={()=>
        isLoggedIN?<OrderPage/> : <LoginPage/>}
      />
      <Route exact path ="/allorder" 
      component={()=>
        userType === "Admin"?<NewOrderPage/> : <AllOrderPage/>}
      />
      <Route component={Home}/>
    </Switch>
    
    </>
   )

 }

 export default App

 export {useWindowSize}