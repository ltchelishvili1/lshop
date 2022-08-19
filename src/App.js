
import './App.css';
import Navbar from './components/parts/Navbar/Navbar';
import Header from './components/parts/Header/Header';
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Link,
} from "react-router-dom";
import { useEffect, useState } from 'react';
import Login from './components/parts/Login/Login';
import Register from './components/parts/Register/Register';
import Card from './components/parts/Card/Card';
import LoginWithLocalStorage from './components/LoginWithLocalStorage';
import Cart from './components/parts/Cart/Cart';
import Profile from './components/parts/Profile/Profile'
export function useForceUpdate(){
  const [value, setValue] = useState(0); 
  return () => setValue(value => value + 1); 
}

function App() {
  
  const forceUpdate=useForceUpdate()
  const getCartItems = JSON.parse(localStorage.getItem("Cart1"))
  const getEmail = localStorage.getItem("emailData")
  const getPassword = localStorage.getItem("passwordData")
  const getUser = JSON.parse(localStorage.getItem("curUser"))

  const[totalAmount,setTotalAmount] = useState(0)
  const [clicked, setClicked] = useState(false);
  const [users, setUsers] = useState([])
  const [loggedInUser, setLoggedInUser] = useState([])
  const [data, setData] = useState([])
  const [data1, setData1] = useState([])
  const [searchResult, setSearchResult] = useState([])
  const [curSearch, setCurSearch] = useState("")
  const [cart, setCart] = useState([])




  
  function cartBody(filteredName) {

    return (
      <div className="card" style={{ minWidth: "300px", maxHeight: "600px" }}>
        <div className="container">
          
        <img className="card-img-top image" src={filteredName.images[0]} alt="Card image cap" style={{ Width: "300px", height: "300px" }} />
          <div className="middle">
           <Link to={`/itemid=${filteredName.id}`}><button className='text btn btn-primary' >See More Details</button> </Link>
          </div>
        </div>
        

        <div className="card-body">
          <h5 className="card-title">{filteredName.title}</h5>
          <p className="card-text">{filteredName.description}</p>
          <p className="card-text"><small className="text-muted">{filteredName.price}$</small></p>
          <button className='btn btn-primary' onClick={() => handleCart(filteredName)}  >Add to Cart</button>
        </div>


        
      </div>
    )
  }

  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/products")
      .then(response => response.json())
      .then(dat => setData1(dat))
  }, [])

  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/categories")
      .then(response => response.json())

      .then(dat => setData(dat))
  }, [])
  useEffect(() => {
    fetch('https://api.storerestapi.com/users')
      .then(response => response.json())
      .then(json => setUsers(json))
  }, [])

  function Search(x) {
    setCurSearch(x)
    
    setSearchResult(
      data1.filter((product) => (
        product.title.indexOf(x) !== -1
      ))
    )

  }

  const handlePrice = () => {
    let ans = 0;
    console.log(getCartItems)
    if (getCartItems){
    getCartItems.map((item) => (ans += item.quantity * item.price));
    }
    forceUpdate()
  };

  

  const cartItemRemove=(item)=>{
    //localStorage.setItem("totalAmount",JSON.parse(getTotalAmount-item.price*item.quantity))
    
    const arr = JSON.parse(localStorage.getItem("Cart1")) || []
    let newArr=[...(
      arr.filter((product) => (
        product.id !==item.id
      ))
    )]
    localStorage.setItem("Cart1", JSON.stringify(newArr))
   // item.quantity=item.quantity-1
    handlePrice()
    forceUpdate()
        
  }

  const handleCart = (filteredName) => {
    

   // localStorage.setItem("totalAmount",JSON.parse(getTotalAmount+filteredName.price))
    let x=[]
    const arr = JSON.parse(localStorage.getItem("Cart1")) || []
    filteredName.quantity=1
   
    if (arr.length == 0) {
      localStorage.setItem("Cart1", JSON.stringify([filteredName]))
    
      forceUpdate()
      
    }else{
      let newArr=[...arr,filteredName]
      x = [...(
        newArr.filter((product) => (
          product.id == filteredName.id
        ))
      )]
      if(x.length>1){
        return ;
      }else
        {  
        localStorage.setItem("Cart1", JSON.stringify(newArr))
       
      }

      
    }
    handlePrice()
    forceUpdate()

  }

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar data={data1} Search={Search} loggedInUser={loggedInUser} getEmail={getEmail} getPassword={getPassword} getUser={getUser} />
        <Routes>
          <Route   path='/' element={<Header cartBody={cartBody} data={data} data1={data1} searchResult={searchResult} curSearch={curSearch} handleCart={handleCart}  />} />
          <Route path='/cart' element={<Cart handlePrice={handlePrice} totalAmount={totalAmount} setTotalAmount={setTotalAmount} cartItemRemove={cartItemRemove} />} />
          {
            data.map((x) => (
              <Route path={`/${x.name.replace(/\s+/g, '')}`} element={<Header cartBody={cartBody} data={data} data1={data1} searchResult={searchResult} curSearch={curSearch} handleCart={handleCart} />} />
            ))
          }
             {
            data1.map((x) => (
              <Route path={`/itemid=${x.id}`} element={ <Card handleCart={handleCart} item={x}/>} />
            ))
          }
          {
            getUser? 
             <>
            {
            getUser.map((user) => (
              <Route path={`/${user._id}`} element={<Profile getCartItems={getCartItems}  cartBody={cartBody} />} />
            ))
          }
              </>
            : null
          }
          <Route path='/login' element={<Login loggedInUser={loggedInUser} clicked={clicked} getEmail={getEmail} getPassword={getPassword} users={users} />} />
          <Route path='/register' element={<Register users={users} />} />
        </Routes>
        <LoginWithLocalStorage />
       
      </BrowserRouter>
    </div>
  );
}

export default App;
