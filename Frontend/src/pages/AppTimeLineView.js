import axios from 'axios';

import PropTypes from 'prop-types';

import { useState } from 'react';

// form
import { useForm, Controller } from 'react-hook-form';
// @mui
import {
  Card,
  Stack,
  Divider,
  Popover,
  Checkbox,
  MenuItem,
  IconButton,
  CardHeader,
  FormControlLabel,
} from '@mui/material';
// components
// ----------------------------------------------------------------------

TimeLineView.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  list: PropTypes.array.isRequired,
};

export default function TimeLineView({ title, subheader, list, }) {

  return (
    <Card>
      <CardHeader title={title} subheader={subheader} />
      {/* <Controller
        name="taskCompleted"
        control={control}
        render={({ field }) => {
          const onSelected = (task) =>
            field.value.includes(task) ? field.value.filter((value) => value !== task) : [...field.value, task];

          return (
            <>
              {list.map((task) => (
                <TaskItem
                  key={task.order_id}
                  task={task}
                  checked={field.value.includes(task.product_name)}
                  onChange={() => field.onChange(onSelected(task.order_date))}
                />
              ))}
            </>
          );
        }}
      /> */}
      <div>
        {
          list.map((order,i)=>(
            <div className='bg-yellow-400 w-full'>{order}</div>
          ))
        }
      </div>
    </Card>
  );
}

// ----------------------------------------------------------------------

TaskItem.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  task: PropTypes.shape({
    order_id: PropTypes.string,
    product_name: PropTypes.string,
  }),
};

function TaskItem({ task, checked, onChange,getPendingTasks }) {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleOrderDelete = async (id) => {
    const res = await axios.put(`http://localhost:5204/updateOrder`,
    {
      "order_id": id,
      "product_name": task.product_name,
      "quantity_ordered": task.quantity_ordered,
      "order_date": task.order_date,
      "status": "Delivered",
      "inventory_id": task.inventory_id
    },
    {
      headers: {'Authorization':`Bearer ${localStorage.getItem('token')}`}
    },
    ).catch(e => console.log(e));

    if (res.data !== null) {
      return (res.data);
    }
    return [];
  };

  const handleMarkComplete = () => {
    handleCloseMenu();
    handleOrderDelete(task.order_id);
    getPendingTasks();
  };

  return (
    <Stack
      direction="row"
      sx={{
        px: 2,
        py: 0.75,
        ...(checked && {
          color: 'text.disabled',
          textDecoration: 'line-through',
        }),
      }}
    >
       <FormControlLabel
        control={<div/>}
        label={`Product : ${task.product_name}`}
        sx={{ flexGrow: 1, m: 0, color:'blue' }}
      />

      <FormControlLabel
        control={<div/>}
        label={task.product_name}
        sx={{ flexGrow: 1, m: 0 }}
      />
      <FormControlLabel
        control={<div/>}
        label={`TimeLine : ${task.last_updated}`}
        sx={{ flexGrow: 1, m: 0, color:'orange' }}
      />

      {/* <IconButton size="large" color="inherit" sx={{ opacity: 0.48 }} onClick={handleOpenMenu}>
        <Iconify icon={'eva:more-vertical-fill'} />
      </IconButton> */}

      {/* <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem onClick={handleMarkComplete}>
          <Iconify icon={'eva:checkmark-circle-2-fill'} sx={{ mr: 2 ,color:'green '}} />
          Mark as Delivered
        </MenuItem>
      </Popover> */}
    </Stack>
  );
}
