import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {

  const [itemText, setItemText] = useState('');
  const [listItems, setListItems] = useState([]);
  const [isUpdating, setIsUpdating] = useState('');
  const [updateItemText, setUpdateItemText] = useState('');

  const addItem = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://to-do-list-app-phi-rust.vercel.app/api/item', { "item": itemText });
      setListItems(prev => [...prev, res.data]);
      setItemText('');
    } catch (error) {
      console.log(error);
    }
  }

  const deleteItem = async (id) => {
    try {
      const res = await axios.delete(`https://to-do-list-app-phi-rust.vercel.app/api/item/${id}`);
      console.log(res.data);
      const newListItems = listItems.filter(item => item._id !== id);
      setListItems(newListItems);
    } catch (error) {
      console.log(error);
    }
  }

  const updateItem = async () => {
    try {
      const res = await axios.put(`https://to-do-list-app-phi-rust.vercel.app/api/item/${isUpdating}`, { item: updateItemText });
      console.log(res.data);
      const updatedItemIndex = listItems.findIndex(item => item._id === isUpdating);
      const updatedItem = listItems[updatedItemIndex].item = updateItemText;
      setUpdateItemText('');
      setIsUpdating(null);
    } catch (error) {
      console.log(error);
    }
  }


  const toggleCompletion = async (id, isCompleted) => {
    try {
      const res = await axios.put(`https://to-do-list-app-phi-rust.vercel.app/api/item/${id}`, { isCompleted: !isCompleted });
      setListItems(listItems.map(item =>
        item._id === id ? { ...item, isCompleted: !isCompleted } : item
      ));
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    const getItemsList = async (e) => {
      try {
        const res = await axios.get('https://to-do-list-app-phi-rust.vercel.app/api/items');
        setListItems(res.data);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
    getItemsList();
  }, []);

  // const getItems = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await axios.get('https://localhost:5000/api/items');
  //     console.log(res);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  return (
    <div className="App">
      <div>
      <header>
        <h1>To-Do List App</h1>
        <p>Organize your tasks effortlessly</p>
      </header>
  
        <div>
          <div style={{ textAlign: "center" }}>
            <div id="division">
{            //  <label htmlFor="input1" id="h3">Enter your note:</label>
}              <input style={{ marginRight: "15px", }} placeholder='Add a new task...' value={itemText} onChange={e => setItemText(e.target.value)} type="text" id="input1" name="notes"></input>
              <button style={{ fontSize: "25px", marginLeft: "15px", }} type="button" onClick={addItem}>Add Task</button>
            </div>

            

            {listItems.map(item =>
              item._id === isUpdating
                ? <ul style={{ display: "flex", justifyContent: "space-around" }} key={item._id}>
                    <input id='input1' style={{ fontSize: "20px", borderRadius: "5px", }} onChange={e => setUpdateItemText(e.target.value)} value={updateItemText}></input>
                    <button style={{ marginTop: "15px", color: "black", backgroundColor: "green" }} onClick={updateItem}>Update</button>
                  </ul>
                : <ul key={item._id}>
                  <div style={{ display: "flex", justifyContent: "space-between" }} >

                  <input
                    type="checkbox"
                    checked={item.isCompleted}
                    onChange={() => toggleCompletion(item._id, item.isCompleted)}
                  />
                    <p>{item.item}</p>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <button style={{ color: "black", backgroundColor: "yellowgreen", margin: "10px" }} onClick={() => {
                        setIsUpdating(item._id);
                        setUpdateItemText(item.item);
                      }}>Edit</button>
                      <button style={{ color: "black", backgroundColor: "rgb(204, 70, 70)", margin: "10px" }} onClick={() => deleteItem(item._id)}>Delete</button>
                    </div>
                  </div>
                </ul>
            )}
          </div>
        </div>
      </div>
    </div >
  );
}

export default App;
