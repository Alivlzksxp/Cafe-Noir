import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Stack,
  Typography,
  Modal,
  TextField,
  Switch,
  FormControlLabel
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { DataGrid } from '@mui/x-data-grid';
import {
  fetchArticles,
  createArticle,
  updateArticle,
  deleteArticle
} from '../../services/ArticleService';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #8d6e63',
  boxShadow: 24,
  p: 4,
  borderRadius: 2
};

const DashArticleListPage = () => {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editArticleId, setEditArticleId] = useState(null);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newArticle, setNewArticle] = useState({
    title: '',
    description: '',
    isActive: true,
  });

  const loadArticles = async () => {
    try {
      setLoading(true);
      const { data } = await fetchArticles();
      setArticles(data.articles);
    } catch (err) {
      console.error('Error fetching articles:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const handleOpen = () => {
    setIsEditing(false);
    setNewArticle({ title: '', description: '', isActive: true });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsEditing(false);
    setEditArticleId(null);
  };

  const handleEdit = id => {
    const art = articles.find(a => a._id === id);
    if (art) {
      setNewArticle({ title: art.title, description: art.description, isActive: art.isActive });
      setEditArticleId(id);
      setIsEditing(true);
      setOpen(true);
    }
  };

  const handleSave = async () => {
    try {
      if (isEditing) {
        await updateArticle(editArticleId, newArticle);
      } else {
        await createArticle(newArticle);
      }
      loadArticles();
      handleClose();
    } catch (err) {
      console.error('Error saving article:', err);
    }
  };

  const handleDelete = async id => {
    if (window.confirm('Delete this article?')) {
      await deleteArticle(id);
      loadArticles();
    }
  };

  const handleToggle = async (id, isActive) => {
    try {
      await updateArticle(id, { isActive: !isActive });
      loadArticles();
    } catch (err) {
      console.error('Error toggling article:', err);
    }
  };

  const columns = [
    { field: 'title', headerName: 'Title', flex: 1 },
    { field: 'description', headerName: 'Description', flex: 1 },
    {
      field: 'isActive',
      headerName: 'Active',
      flex: 0.5,
      renderCell: params => (
        <Switch
          checked={params.row.isActive}
          onChange={() => handleToggle(params.row._id, params.row.isActive)}
          sx={{
            '& .MuiSwitch-switchBase.Mui-checked': { color: '#8d6e63' },
            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
              backgroundColor: '#bcaaa4'
            },
            '& .MuiSwitch-track': {
              backgroundColor: '#d7ccc8'
            }
          }}
        />
      )
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: params => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="contained"
            size="small"
            onClick={() => handleEdit(params.row._id)}
            sx={{ bgcolor: '#6d4c41', '&:hover': { bgcolor: '#5d4037' } }}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            size="small"
            onClick={() => handleDelete(params.row._id)}
            sx={{
              color: '#6d4c41',
              borderColor: '#6d4c41',
              '&:hover': {
                borderColor: '#5d4037',
                backgroundColor: '#efebe9'
              }
            }}
          >
            Delete
          </Button>
        </Box>
      )
    }
  ];

  return (
    <>
      <Stack
        direction="row"
        sx={{ mb: 4, justifyContent: 'space-between', alignItems: 'center' }}
      >
        <Typography variant="h3" fontWeight="bold">
          Articles
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddCircleIcon />}
          onClick={handleOpen}
          sx={{ bgcolor: '#6d4c41', '&:hover': { bgcolor: '#5d4037' } }}
        >
          Add Article
        </Button>
      </Stack>

      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography variant="h5" mb={2}>
            {isEditing ? 'Edit Article' : 'New Article'}
          </Typography>
          <TextField
            fullWidth
            label="Title"
            variant="standard"
            value={newArticle.title}
            onChange={e =>
              setNewArticle({ ...newArticle, title: e.target.value })
            }
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Description"
            variant="standard"
            multiline
            rows={4}
            value={newArticle.description}
            onChange={e =>
              setNewArticle({ ...newArticle, description: e.target.value })
            }
            sx={{ mb: 2 }}
          />
          <FormControlLabel
            control={
              <Switch
                checked={newArticle.isActive}
                onChange={e =>
                  setNewArticle({ ...newArticle, isActive: e.target.checked })
                }
                sx={{
                  '& .MuiSwitch-switchBase.Mui-checked': {
                    color: '#8d6e63'
                  },
                  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                    backgroundColor: '#bcaaa4'
                  },
                  '& .MuiSwitch-track': {
                    backgroundColor: '#d7ccc8'
                  }
                }}
              />
            }
            label="Active"
            sx={{ mb: 3 }}
          />
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button
              variant="outlined"
              onClick={handleClose}
              sx={{
                color: '#6d4c41',
                borderColor: '#6d4c41',
                '&:hover': {
                  borderColor: '#5d4037',
                  backgroundColor: '#efebe9'
                }
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSave}
              sx={{ bgcolor: '#6d4c41', '&:hover': { bgcolor: '#5d4037' } }}
            >
              {isEditing ? 'Save' : 'Create'}
            </Button>
          </Stack>
        </Box>
      </Modal>

      <Box sx={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={articles}
          columns={columns}
          getRowId={row => row._id}
          loading={loading}
          pageSize={10}
          rowsPerPageOptions={[10, 20, 50]}
          disableSelectionOnClick
        />
      </Box>
    </>
  );
};

export default DashArticleListPage;
