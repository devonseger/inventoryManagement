// import InventoryForm from "../components/InventoryForm";
// import { useState, useEffect } from "react";
// import { getItems, addItem, updateItem, deleteItem } from '../api';

// export default function AddItem() {

//     const [currentItem, setCurrentItem] = useState(null);
//     const [items, setItems] = useState([]);

//     const handleAdd = async (item) => {
//         try {
//           await addItem(item);
//           fetchItems();
//         } catch (error) {
//           console.error('Error adding item:', error);
//         }
//       };

//       const handleUpdate = async (item) => {
//         try {
//           await updateItem(item._id, item);
//           fetchItems();
//           setCurrentItem(null);
//         } catch (error) {
//           console.error('Error updating item:', error);
//         }
//       };

//       useEffect(() => {
//         fetchItems();
//       }, []);
    
//       const fetchItems = async () => {
//         try {
//           const data = await getItems();
//           setItems(Array.isArray(data) ? data : []);
//         } catch (error) {
//           console.error('Error fetching inventory:', error);
//           setItems([]);
//         }
//       };

//   return (
//     <>
//       <InventoryForm
//         currentItem={currentItem}
//         onAdd={handleAdd}
//         onUpdate={handleUpdate}
//       />
//     </>
//   );
// }
