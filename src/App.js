
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
import { useEffect, useRef, useState } from 'react';
import Login from './components/parts/Login/Login';
import Register from './components/parts/Register/Register';
import Card from './components/parts/Card/Card';
import LoginWithLocalStorage from './components/LoginWithLocalStorage';
import Cart from './components/parts/Cart/Cart';
import Profile from './components/parts/Profile/Profile'
import CartOverlay from './components/CartOverlay/CartOverlay';
import Pagination from './components/parts/Pagination/Pagination';
export function useForceUpdate() {
  const [value, setValue] = useState(0);
  return () => setValue(value => value + 1);
}


function App() {
  const [page,setPage] = useState(1)
  console.log(page)
  const [postsPerPAge, setPostsPerPage] = useState(9)
  const indexofLastPost = page * postsPerPAge
  
  const indexofFirstPost = indexofLastPost - postsPerPAge
  console.log(indexofFirstPost)
  const [min, setMin] = useState(0)
  const [max, setMax] = useState(Number.MAX_SAFE_INTEGER)
  const forceUpdate = useForceUpdate()
  const getCartItems = JSON.parse(localStorage.getItem("Cart1"))
  const getEmail = localStorage.getItem("emailData")
  const getPassword = localStorage.getItem("passwordData")
  const getUser = JSON.parse(localStorage.getItem("curUser"))
  const [totalAmount, setTotalAmount] = useState(0)
  const [users, setUsers] = useState([])
  const [loggedInUser, setLoggedInUser] = useState([])
  const [data, setData] = useState([])
  const [data1, setData1] = useState([])
  const [searchResult, setSearchResult] = useState([])
  const [curSearch, setCurSearch] = useState("")
  const [temp, setTemp] = useState(false)
  const getCartTotal = () => {
    return getCartItems
      .reduce((acc, value) => {
        return acc + value.price * value.quantity;
      }, 0)
      .toFixed(2);
  };
  function filterByPrice() {
    setSearchResult(
      data1.filter((product) => (
        product.price <= max && product.price >= min
      ))
    )

  }
  function sortByasc(x) {
    if (x == "asc") {
      setSearchResult(
        [...searchResult].sort((a, b) => a.price - b.price)
      )
    } else {
      setSearchResult(
        [...searchResult].sort((a, b) => b.price - a.price)
      )
    }
  }
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(data1.length / postsPerPAge); i++) {
    pageNumbers.push(i);
  }
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
  function setApiData(dat) {
    setData1(dat)
    setSearchResult(dat)
  }
  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/products")
      .then(response => response.json())
      .then(dat => setApiData(dat))

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
    if (x == "") {
      setSearchResult(data1)
    } else {
      setSearchResult(
        data1.filter((product) => (
          product.title.toLowerCase().indexOf(x.toLowerCase()) !== -1
        ))
      )
    }

  }

  const handlePrice = () => {
    let ans = 0;
    if (getCartItems) {
      getCartItems.map((item) => (ans += item.quantity * item.price));
    }
    forceUpdate()
  };



  const cartItemRemove = (item) => {
    //localStorage.setItem("totalAmount",JSON.parse(getTotalAmount-item.price*item.quantity))

    const arr = JSON.parse(localStorage.getItem("Cart1")) || []
    let newArr = [...(
      arr.filter((product) => (
        product.id !== item.id
      ))
    )]
    localStorage.setItem("Cart1", JSON.stringify(newArr))
    // item.quantity=item.quantity-1
    handlePrice()
    forceUpdate()

  }

  const handleCart = (filteredName) => {


    // localStorage.setItem("totalAmount",JSON.parse(getTotalAmount+filteredName.price))
    let x = []
    const arr = JSON.parse(localStorage.getItem("Cart1")) || []
    filteredName.quantity = 1

    if (arr.length == 0) {
      localStorage.setItem("Cart1", JSON.stringify([filteredName]))

      forceUpdate()

    } else {
      let newArr = [...arr, filteredName]
      x = [...(
        newArr.filter((product) => (
          product.id == filteredName.id
        ))
      )]
      if (x.length > 1) {
        return;
      } else {
        localStorage.setItem("Cart1", JSON.stringify(newArr))

      }


    }
    handlePrice()
    forceUpdate()

  }
  function quantityChange(item, x) {
    if (x != 1 && item.quantity == 1) {
      cartItemRemove(item)
    }
    else {
      const arr = JSON.parse(localStorage.getItem("Cart1")) || []
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].id == item.id) {
          if (x == 1) {
            arr[i].quantity = arr[i].quantity + 1

            localStorage.setItem("Cart1", JSON.stringify(arr))
          } else {

            arr[i].quantity = arr[i].quantity - 1
            item.price = item.price * item.quantity
          }
          localStorage.setItem("Cart1", JSON.stringify(arr))


        }
      }
    }
    forceUpdate()



  }
  function closeCartOverlay() {
    if (temp) {
      var ignoreClickOnMeElement = document.getElementById("bicart");
      var ignoreClickOnMeElement1 = document.getElementById("cartapp")
      document.addEventListener('click', function (event) {
        if (ignoreClickOnMeElement != null && ignoreClickOnMeElement1 != null) {
          var isClickInsideElement = ignoreClickOnMeElement.contains(event.target)
            || ignoreClickOnMeElement1.contains(event.target);
          setTemp(isClickInsideElement)
        }
      });
    }
  }


  return (
    <div onClick={() => closeCartOverlay()} className="App">
      <BrowserRouter>
        <Navbar className="navbarapp" data={data1} temp={temp} setTemp={setTemp} Search={Search} loggedInUser={loggedInUser} getEmail={getEmail} getPassword={getPassword} getUser={getUser} />

        {temp ? <div id='cartapp' className='fixed-top cartapp'
          style={{ paddingTop: "2rem", paddingRight: "3rem" }}><CartOverlay className="cartoverlay" quantityChange={quantityChange}
            getCartTotal={getCartTotal} getCartItems={getCartItems} /> </div> : null}
        <Routes>
          <Route path='/' element={<Header forceUpdate={forceUpdate} sortByasc={sortByasc} filterByPrice={filterByPrice} setMin={setMin} setMax={setMax} cartBody={cartBody} data={data} data1={data1} searchResult={searchResult} curSearch={curSearch} handleCart={handleCart} />} />
          <Route path='/cart' element={<Cart quantityChange={quantityChange} getCartTotal={getCartTotal} handlePrice={handlePrice} totalAmount={totalAmount} setTotalAmount={setTotalAmount} cartItemRemove={cartItemRemove} />} />
          {
            data.map((x) => (
              <Route path={`/${x.name.replace(/\s+/g, '')}`}
                element={<Header
                forceUpdate={forceUpdate}
                  sortByasc={sortByasc}
                  filterByPrice={filterByPrice}
                  setMin={setMin}
                  setMax={setMax}
                  cartBody={cartBody}
                  data={data}
                  data1={data1}
                  searchResult={searchResult}
                  curSearch={curSearch}
                  handleCart={handleCart} />} />
            ))
          }
          {
            data1.map((x) => (
              <Route path={`/itemid=${x.id}`} element={<Card handleCart={handleCart} item={x} />} />
            ))
          }
          {
            getUser ?
              <>
                {
                  getUser.map((user) => (
                    <Route path={`/${user._id}`} element={<Profile getCartItems={getCartItems} cartBody={cartBody} />} />
                  ))
                }
              </>
              : null
          }
    
          <Route path='/login' element={<Login loggedInUser={loggedInUser} getEmail={getEmail} getPassword={getPassword} users={users} />} />
          <Route path='/register' element={<Register users={users} />} />
        </Routes>
       
        <LoginWithLocalStorage />

      </BrowserRouter>
    </div>
  );
}

export default App;
