"use client";
import { useContext, createContext, useState, useEffect } from "react";
import { message } from "antd";
const CartContext = createContext();
const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoad, setIsLoad] = useState(false);
  console.log("art provider render");
  console.log("cartItems:", cartItems);

  useEffect(() => {
    console.log("Load effect");
    const storedItem = localStorage.getItem("cart");
    console.log("stored Item", storedItem);
    if (storedItem) {
      setCartItems(JSON.parse(storedItem));
      //      return JSON.parse(storedItem);
      // console.log("Parsed Data:", data);

      // setCartItems(data);
    }
    setIsLoad(true); //  Load Effect ले setCartItems(Room101) call गर्यो। तर React ले त्यो state update अर्को render मा गर्छ। त्यसैले त्यो render सकिनुअघि Save Effect ले अझै पुरानो cartItems ([]) नै देख्यो। that why we use load loaad nahunjel samma saveeefect nachalos
  }, []);

  useEffect(() => {
    console.log("Saving cartItems:", cartItems);
    if (!isLoad) return;

    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems, isLoad]);

  // useEffect(()=>{
  //   if (!isLoad) return;
  // }, [cartItems, isLoad]);

  const handleAddToCart = (room) => {
    console.log("current room", room);

    const existingItems = cartItems.find((item) => item.id == room.id);
    if (existingItems) {
      message.warning(`${room.roomName} already in a cart`);
      return; //return because function ahi rokna chahanxaw
    }
    setCartItems([...cartItems, room]);
    //  console.log("After add", [...cartItems, room]);
    // setCartItems([...cartItems, room]);
    // setCartOpen(true);
  };

  const handleRemove = (id) => {
    const newCartItems = cartItems.filter((i) => i.id !== id);
    console.log("New cart", newCartItems);
    setCartItems(newCartItems);
  };
  const totalValue = cartItems.reduce((total, item) => {
    return (total = total + item.price);
  }, 0);

  const clearCart = () => {
    setCartItems([]);
  };

  const updateCartItems = (id, field, value) => {
    //id => kun room update garney, field =>kun field update garney check in or check out, value=> kun date rakhaney
    const updatedCart = cartItems.map((item) => {
      if (
        item.id === id
      ) //hamro id = 1 xa if item.id sanga id atch bhayo bhaney true return garaney
      {
        return {
          ...item,  //item ko data jstoi roomName, roomNumber, roomType aba
          checkIn: value,   //yespaxi ya checkIn update hunxa ra pahila checkIn ma null thiyo aba value(date) awxa
        };
      }

      return item; // if item.id sanga id match bhayena bhaney item return garney. dosro iteration maa item.is sanga id match bhayena bhaney yo item jasta ko testoi rakha
    });
    setCartItems(updatedCart);  //react la bhano yo naya array nai aba state ho react rerender gaxa ui update hunxa ra checkin ma date awxa 
  };
  return (
    <CartContext.Provider
      value={{
        cartItems,
        handleAddToCart,
        handleRemove,
        totalValue,
        clearCart,
        updateCartItems
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
export default CartProvider;
export const useCart = () => useContext(CartContext);
