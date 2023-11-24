
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import {
  getAllCategories,
  createCategory,
  updateCategory as updateCategoryAPI,
  deleteCategory as deleteCategoryAPI,
} from './categoryApi';
import {
  selectLoading,
  selectError,
  selectCategories,
  setCategories,
  setLoading,
  setError,
} from './categorySlice';

const CategoryList = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('insert');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryData, setCategoryData] = useState({
    id: null,
    categoryName: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(setLoading(true));
        const data = await getAllCategories();
        dispatch(setCategories(data));
      } catch (error) {
        dispatch(setError(error.message));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchData();
  }, [dispatch]);

  const handleInsert = async () => {
    try {
      const savedCategory = await createCategory(categoryData);
      dispatch(setCategories([...categories, savedCategory]));
      handleCloseModal();
    } catch (error) {
      dispatch(setError(error.message));
    }
  };

  const handleUpdate = async () => {
    try {
      if (selectedCategory) {
        await updateCategoryAPI(selectedCategory.id, categoryData);
        dispatch(
          setCategories(
            categories.map((category) =>
              category.id === selectedCategory.id ? { ...category, ...categoryData } : category
            )
          )
        );
        handleCloseModal();
      }
    } catch (error) {
      dispatch(setError(error.message));
    }
  };

  const handleDelete = async () => {
    try {
      if (selectedCategory) {
        await deleteCategoryAPI(selectedCategory.id);
        dispatch(setCategories(categories.filter((category) => category.id !== selectedCategory.id)));
        handleCloseModal();
      }
    } catch (error) {
      dispatch(setError(error.message));
    }
  };

  const handleOpenModal = (mode, category) => {
    setIsModalOpen(true);
    setModalMode(mode);
    setSelectedCategory(category);
    if (category) {
      setCategoryData({ ...category });
    } else {
      setCategoryData({ id: null, categoryName: '' });
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalMode('insert');
    setSelectedCategory(null);
    setCategoryData({ id: null, categoryName: '' });
  };

  return (
    <div>
      <h2>Category List</h2>
      <Button variant="contained" color="primary" onClick={() => handleOpenModal('insert', null)}>
        Add Category
      </Button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && categories.length > 0 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Category Name</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>{category.id}</TableCell>
                  <TableCell>{category.categoryName}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" onClick={() => handleOpenModal('update', category)}>
                      Edit
                    </Button>
                    <Button variant="contained" color="error" onClick={() => handleOpenModal('delete', category)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Paper>
          <div>
            <h2>{modalMode === 'insert' ? 'Add Category' : modalMode === 'update' ? 'Edit Category' : 'Delete Category'}</h2>
            <TextField
              label="Category Name"
              variant="outlined"
              fullWidth
              value={categoryData.categoryName}
              onChange={(e) => setCategoryData({ ...categoryData, categoryName: e.target.value })}
            />
            <div>
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
                <Button variant="contained" color="error" onClick={handleDelete}>
                  Delete
                </Button>
              )}
              <Button variant="contained" onClick={handleCloseModal}>
                Cancel
              </Button>
            </div>
          </div>
        </Paper>
      </Modal>
    </div>
  );
};

export default CategoryList;