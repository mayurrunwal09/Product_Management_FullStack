




// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   Modal,
//   Button,
//   TextField,
//   Select,
//   MenuItem,
//   InputLabel,
//   FormControl,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
// } from '@mui/material';
// import {
//   getAllProducts,
//   createProduct,
//   updateProduct as updateProductAPI,
//   deleteProduct as deleteProductAPI,
//   addToCart as addToCartAPI,
//   getAllCategories,
// } from './enrollProduct';
// import {
//   selectLoading,
//   selectError,
//   selectProducts,
//   setProducts,
//   addProduct,
//   updateProduct,
//   deleteProduct,
// } from './ProductSlice';
// import './ProductList.css';

// const ProductList = () => {
//   const dispatch = useDispatch();
//   const allProducts = useSelector(selectProducts);
//   const loading = useSelector(selectLoading);
//   const error = useSelector(selectError);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalMode, setModalMode] = useState('insert');
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [productData, setProductData] = useState({
//     id: null,
//     productName: '',
//     price: '',
//     stockQuantity: '',
//     categoryId: '',
//   });
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await getAllProducts();
//         dispatch(setProducts(data));

//         const categoryData = await getAllCategories();
//         setCategories(categoryData);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, [dispatch]);

//   useEffect(() => {
//     const filtered = allProducts.filter((product) =>
//       product.productName &&
//       product.productName.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     setFilteredProducts(filtered);
//   }, [allProducts, searchTerm]);

//   const getCategoryName = (categoryId) => {
//     const category = categories.find((category) => category.id === categoryId);
//     return category ? category.categoryName : 'N/A';
//   };

//   const handleInsert = async () => {
//     try {
//       const savedProduct = await createProduct(productData);
//       dispatch(addProduct(savedProduct));
//       handleCloseModal();
//     } catch (error) {
//       console.error('Error inserting product:', error);
//     }
//   };

//   const handleUpdate = async () => {
//     try {
//       if (selectedProduct) {
//         await updateProductAPI(selectedProduct.id, productData);
//         dispatch(
//           updateProduct({ id: selectedProduct.id, updatedProductData: productData })
//         );
//         handleCloseModal();
//       }
//     } catch (error) {
//       console.error('Error updating product:', error);
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       if (selectedProduct) {
//         await deleteProductAPI(selectedProduct.id);
//         dispatch(deleteProduct(selectedProduct.id));
//         handleCloseModal();
//       }
//     } catch (error) {
//       console.error('Error deleting product:', error);
//     }
//   };

//   const handleAddToCart = async (product) => {
//     try {
//       await addToCartAPI(product.id, dispatch);
//     } catch (error) {
//       console.error('Error adding to cart:', error);
//     }
//   };

//   const handleOpenModal = (mode, product) => {
//     setIsModalOpen(true);
//     setModalMode(mode);
//     setSelectedProduct(product);
//     if (product) {
//       setProductData({ ...product });
//     } else {
//       setProductData({
//         id: null,
//         productName: '',
//         price: '',
//         stockQuantity: '',
//         categoryId: '',
//       });
//     }
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setModalMode('insert');
//     setSelectedProduct(null);
//     setProductData({
//       id: null,
//       productName: '',
//       price: '',
//       stockQuantity: '',
//       categoryId: '',
//     });
//   };

//   return (
//     <div>
//       <h2>Product List</h2>
//       <TextField
//         label=""
//         variant="outlined"
//         fullWidth
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />
//       <Button
//         variant="contained"
//         color="primary"
//         onClick={() => handleOpenModal('insert', null)}
//       >
//         Add Product
//       </Button>
//       {loading && <p>Loading...</p>}
//       {error && <p className="error-message">Error: {error.message}</p>}
//       {!loading && !error && (filteredProducts.length > 0 || searchTerm === '') && (
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Product ID</TableCell>
//                 <TableCell>Product Name</TableCell>
//                 <TableCell>Price</TableCell>
//                 <TableCell>Stock Quantity</TableCell>
//                 <TableCell>Category</TableCell>
//                 <TableCell>Actions</TableCell>
//                 <TableCell>Add to Cart</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {filteredProducts.map((product) => (
//                 <TableRow key={product.id}>
//                   <TableCell>{product.id}</TableCell>
//                   <TableCell>{product.productName}</TableCell>
//                   <TableCell>{product.price}</TableCell>
//                   <TableCell>{product.stockQuantity}</TableCell>
//                   <TableCell>{getCategoryName(product.categoryId)}</TableCell>
//                   <TableCell>
//                     <Button
//                       className="edit-button"
//                       variant="contained"
//                       color="primary"
//                       onClick={() => handleOpenModal('update', product)}
//                     >
//                       Edit
//                     </Button>
//                     <Button
//                     className="delete-button"
//                     variant="contained"
//                     style={{ backgroundColor: '#FF0000', color: '#FFFFFF' }}  
//                     onClick={() => handleOpenModal('delete', product)}
//                   >
//                     Delete
//                   </Button>
//                   </TableCell>
//                   <TableCell>
//                   <Button
//                   variant="contained"
//                   style={{ backgroundColor: '#4CAF50', color: '#FFFFFF' }}  // Set your desired green color
//                   onClick={() => handleAddToCart(product)}
//                 >
//                   Add to Cart
//                 </Button>

//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}

//       <Modal open={isModalOpen} onClose={handleCloseModal} className="modal">
//         <div className="modal-content">
//           <h2>
//             {modalMode === 'insert'
//               ? 'Add Product'
//               : modalMode === 'update'
//               ? 'Edit Product'
//               : 'Delete Product'}
//           </h2>
//           <TextField
//             label="Product Name"
//             variant="outlined"
//             fullWidth
//             value={productData.productName}
//             onChange={(e) =>
//               setProductData({ ...productData, productName: e.target.value })
//             }
//           />
//           <TextField
//             label="Price"
//             variant="outlined"
//             fullWidth
//             type="number"
//             value={productData.price}
//             onChange={(e) =>
//               setProductData({ ...productData, price: e.target.value })
//             }
//           />
//           <TextField
//             label="Stock Quantity"
//             variant="outlined"
//             fullWidth
//             type="number"
//             value={productData.stockQuantity}
//             onChange={(e) =>
//               setProductData({ ...productData, stockQuantity: e.target.value })
//             }
//           />
//           <FormControl fullWidth>
//             <InputLabel id="category-label">Category</InputLabel>
//             <Select
//               labelId="category-label"
//               id="category"
//               value={productData.categoryId}
//               onChange={(e) =>
//                 setProductData({ ...productData, categoryId: e.target.value })
//               }
//             >
//               {categories.map((category) => (
//                 <MenuItem key={category.id} value={category.id}>
//                   {category.categoryName}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//           <div className="modal-buttons">
//             {modalMode === 'insert' && (
//               <Button variant="contained" onClick={handleInsert}>
//                 Save
//               </Button>
//             )}
//             {modalMode === 'update' && (
//               <Button variant="contained" onClick={handleUpdate}>
//                 Update
//               </Button>
//             )}
//             {modalMode === 'delete' && (
//               <Button variant="contained" onClick={handleDelete}>
//                 Delete
//               </Button>

              
//             )}
           
//           </div>
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default ProductList;











import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Modal,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import {
  getAllProducts,
  createProduct,
  updateProduct as updateProductAPI,
  deleteProduct as deleteProductAPI,
  addToCart as addToCartAPI,
  getAllCategories,
} from './enrollProduct';
import {
  selectLoading,
  selectError,
  selectProducts,
  setProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from './ProductSlice';
import './ProductList.css';
import SearchBar from '../../Component/DetailsByProductName';

const ProductList = () => {
  const dispatch = useDispatch();
  const allProducts = useSelector(selectProducts);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('insert');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productData, setProductData] = useState({
    id: null,
    productName: '',
    price: '',
    stockQuantity: '',
    categoryId: '',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllProducts();
        dispatch(setProducts(data));

        const categoryData = await getAllCategories();
        setCategories(categoryData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const filtered = allProducts.filter((product) =>
      product.productName &&
      product.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredProducts(filtered);
  }, [allProducts, searchTerm]);

  const getCategoryName = (categoryId) => {
    const category = categories.find((category) => category.id === categoryId);
    return category ? category.categoryName : 'N/A';
  };

  const handleInsert = async () => {
    try {
      const savedProduct = await createProduct(productData);
      dispatch(addProduct(savedProduct));
      handleCloseModal();
    } catch (error) {
      console.error('Error inserting product:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      if (selectedProduct) {
        await updateProductAPI(selectedProduct.id, productData);
        dispatch(
          updateProduct({ id: selectedProduct.id, updatedProductData: productData })
        );
        handleCloseModal();
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleDelete = async () => {
    try {
      if (selectedProduct) {
        await deleteProductAPI(selectedProduct.id);
        dispatch(deleteProduct(selectedProduct.id));
        handleCloseModal();
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleAddToCart = async (product) => {
    try {
      await addToCartAPI(product.id, dispatch);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handleOpenModal = (mode, product) => {
    setIsModalOpen(true);
    setModalMode(mode);
    setSelectedProduct(product);
    if (product) {
      setProductData({ ...product });
    } else {
      setProductData({
        id: null,
        productName: '',
        price: '',
        stockQuantity: '',
        categoryId: '',
      });
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalMode('insert');
    setSelectedProduct(null);
    setProductData({
      id: null,
      productName: '',
      price: '',
      stockQuantity: '',
      categoryId: '',
    });
  };

  return (
    <div>
      <h2>Product List</h2>
     
      <SearchBar searchTerm={searchTerm} onSearchTermChange={setSearchTerm} />
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOpenModal('insert', null)}
      >
        Add Product
      </Button>
      {loading && <p>Loading...</p>}
      {error && <p className="error-message">Error: {error.message}</p>}
      {!loading && !error && (filteredProducts.length > 0 || searchTerm === '') && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product ID</TableCell>
                <TableCell>Product Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Stock Quantity</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Actions</TableCell>
                <TableCell>Add to Cart</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.productName}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.stockQuantity}</TableCell>
                  <TableCell>{getCategoryName(product.categoryId)}</TableCell>
                  <TableCell>
                    <Button
                      className="edit-button"
                      variant="contained"
                      color="primary"
                      onClick={() => handleOpenModal('update', product)}
                    >
                      Edit
                    </Button>
                    <Button
                    className="delete-button"
                    variant="contained"
                    style={{ backgroundColor: '#FF0000', color: '#FFFFFF' }}  
                    onClick={() => handleOpenModal('delete', product)}
                  >
                    Delete
                  </Button>
                  </TableCell>
                  <TableCell>
                  <Button
                  variant="contained"
                  style={{ backgroundColor: '#4CAF50', color: '#FFFFFF' }}  // Set your desired green color
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </Button>

                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Modal open={isModalOpen} onClose={handleCloseModal} className="modal">
        <div className="modal-content">
          <h2>
            {modalMode === 'insert'
              ? 'Add Product'
              : modalMode === 'update'
              ? 'Edit Product'
              : 'Delete Product'}
          </h2>
          <TextField
            label="Product Name"
            variant="outlined"
            fullWidth
            value={productData.productName}
            onChange={(e) =>
              setProductData({ ...productData, productName: e.target.value })
            }
          />
          <TextField
            label="Price"
            variant="outlined"
            fullWidth
            type="number"
            value={productData.price}
            onChange={(e) =>
              setProductData({ ...productData, price: e.target.value })
            }
          />
          <TextField
            label="Stock Quantity"
            variant="outlined"
            fullWidth
            type="number"
            value={productData.stockQuantity}
            onChange={(e) =>
              setProductData({ ...productData, stockQuantity: e.target.value })
            }
          />
          <FormControl fullWidth>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              id="category"
              value={productData.categoryId}
              onChange={(e) =>
                setProductData({ ...productData, categoryId: e.target.value })
              }
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.categoryName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <div className="modal-buttons">
            {modalMode === 'insert' && (
              <Button variant="contained" onClick={handleInsert}>
                Save
              </Button>
            )}
            {modalMode === 'update' && (
              <Button variant="contained" onClick={handleUpdate}>
                Update
              </Button>
            )}
            {modalMode === 'delete' && (
              <Button variant="contained" onClick={handleDelete}>
                Delete
              </Button>

              
            )}
           
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProductList;








