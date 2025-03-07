import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  Slider,
  Switch,
  Typography,
} from '@mui/material';
import { priorityMarks } from '../assets/assets';

const EditTask = ({ editTask, handleEdit, getTasks, URL, userID, row }) => {
  const style = {
    fontWeight: {
      fontWeight: '600',
    },
    fontSize: {
      fontSize: '12px',
    },
  };

  const [data, setData] = useState({
    title: row.title,
    description: row.description,
    priority: row.priority,
    status: row.status,
    due_date: row.due_date,
    user_id: userID,
  });

  function onChangeHandler(event) {
    let { name, value } = event.target;
    // console.log(name, value);
    if (name === 'status') {
      value = event.target.checked;
    }
    setData(data => ({ ...data, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    // console.log(data);
    const response = await axios.post(`${URL}/api/task/edit`, {
      ...data,
      id: row.id,
    });
    if (response.data.success) {
      toast.success(response.data.message);
      getTasks();
    } else {
      toast.error(response.data.message);
    }
    handleEdit();
  }

  return (
    <React.Fragment>
      <Dialog
        open={editTask}
        onClose={handleEdit}
        PaperProps={{
          component: 'form',
          onSubmit: event => {
            handleSubmit(event);
          },
        }}
        aria-modal="true"
      >
        <DialogTitle sx={{ fontWeight: 600, fontSize: '1.5em' }}>
          Edit task{' '}
          <Typography sx={style.fontSize}>Task ID: {row._id}</Typography>
        </DialogTitle>
        <DialogContent sx={{ minWidth: '400px' }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplate: 'repeat(3, 1fr) / repeat(2, 1fr)',
              gap: '10px 30px',
            }}
          >
            <Box sx={{ gridColumn: 'span 2' }}>
              <Typography sx={style.fontWeight}>Title</Typography>
              <TextField
                required
                name="title"
                value={data.title}
                onChange={onChangeHandler}
                size="small"
                sx={{ width: '70%' }}
              />
            </Box>

            <Box sx={{ gridColumn: 'span 2' }}>
              <Typography sx={style.fontWeight}>Description</Typography>
              <TextField
                required
                name="description"
                value={data.description}
                onChange={onChangeHandler}
                size="small"
                sx={{ width: '70%' }}
              />
            </Box>

            <Box>
              <Typography sx={style.fontWeight}>Priority</Typography>
              <Slider
                name="priority"
                min={1}
                max={5}
                marks={priorityMarks}
                value={data.priority}
                onChange={onChangeHandler}
                size="medium"
              />
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography sx={style.fontWeight}>Status</Typography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Typography sx={style.fontSize}>Pending</Typography>
                <Switch
                  name="status"
                  value={data.status}
                  checked={data.status}
                  onChange={onChangeHandler}
                />
                <Typography sx={style.fontSize}>Finished</Typography>
              </Box>
            </Box>

            <Box>
              <Typography sx={style.fontWeight}>Due Date</Typography>
              <TextField
                required
                name="due_date"
                size="small"
                type="datetime-local"
                value={data.due_date.substring(0, 16)}
                onChange={onChangeHandler}
              ></TextField>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" type="submit">
            Update
          </Button>
          <Button variant="outlined" onClick={handleEdit}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default EditTask;
