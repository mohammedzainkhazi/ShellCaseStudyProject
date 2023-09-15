import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
// @mui
import { Stack, Button, Popover, MenuItem, Container, Typography } from '@mui/material';

import axios from 'axios';
import Label from '../components/label';

// components
import Iconify from '../components/iconify';
// sections
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: 'Id', alignRight: false },
  { id: 'prod_id', label: 'Product ID', alignRight: false },
  { id: 'qty', label: 'Quantity', alignRight: false },
  { id: 'date', label: 'Date', alignRight: false },
  { id: 'time', label: 'Time', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '' },
];

export default function OrdersPage() {
  const [open, setOpen] = useState(null);

  const [orders, setOrders] = useState([]);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };
  // ----------------------------------------------------------------------

  const getOrders = async () => {
    const res = await axios.get('http://localhost:5204/getAllOrders', {
      headers: {'Authorization':`Bearer ${localStorage.getItem('token')}`}
    },
    ).catch(e => console.log(e));

    if (res.data !== null) {
      return res.data;
    }
    return [];
  };

  // Handle Order Delete by ID 
  const handleOrderDelete = async (id) => {
    const res = await axios.delete(`http://localhost:5204/deleteOrder?id=${id}`, {
      headers: {'Authorization':`Bearer ${localStorage.getItem('token')}`}
    },
    ).catch(e => console.log(e));

    if (res.data !== null) {
      return (res.data);
    }
    return [];
  };

  useEffect(() => {
    getOrders().then((data) => setOrders(data));
  }, []);

  function DateDisplay({ dateStr }) {
    const inputDate = new Date(dateStr);
    const year = inputDate.getFullYear();
    const month = String(inputDate.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const day = String(inputDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }

  function TimeDisplay({ datetimeStr }) {
    const inputDate = new Date(datetimeStr);
    const hours = String(inputDate.getHours()).padStart(2, '0');
    const minutes = String(inputDate.getMinutes()).padStart(2, '0');
    const seconds = String(inputDate.getSeconds()).padStart(2, '0');
    const formattedTime = `${hours}:${minutes}:${seconds}`;
    return formattedTime;
  }

  return (
    <>
      <Helmet>
        <title> Orders </title>
      </Helmet>

      <Container className='mt-5'>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Orders
          </Typography>
          <Button onClick={e=>getOrders().then(data=>setOrders(data))} className='!bg-green-500' variant="contained" startIcon={<Iconify icon="eva:sync-fill" />}>
            Refresh
          </Button>
          <Button className='!bg-blue-500' variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            New Order
          </Button>
        </Stack>

        <Stack>
          <section className="container px-4 mx-auto">
            <div className="flex flex-col">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div className="overflow-hidden border border-gray-200  md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200 ">
                      <thead className="bg-gray-50 ">
                        <tr>
                          {TABLE_HEAD.map((head, index) => (
                            <th
                              key={index}
                              scope="col"
                              className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
                            >
                              {head.label}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200  ">
                        {orders.map((prod, i) => (
                          <tr key={i}>
                            <td className="px-12 py-4 text-sm font-normal text-gray-700 text-center whitespace-nowrap">
                              {prod.order_id}
                              </td>
                              <td className="px-12 py-4 text-sm font-normal text-gray-700 text-center whitespace-nowrap">
                              {prod.product_name}
                              </td>
                              <td className="px-4 py-4 text-sm text-gray-500 text-center whitespace-nowrap">{prod.quantity_ordered}</td>
                              <td className="px-4 py-4 text-sm text-gray-500 text-center whitespace-nowrap">{ <DateDisplay dateStr={ prod.order_date } /> }</td>
                              <td className="px-4 py-4 text-sm text-gray-500 text-center whitespace-nowrap">{<TimeDisplay datetimeStr={prod.order_date} />}</td>
                              <td className="px-4 py-4 text-sm text-gray-500 text-center whitespace-nowrap">
                                <Label color={(prod.status === 'placed' && 'success') || 'info'}>{(prod.status)}</Label>
                              </td>
                              <td className="px-4 py-4 text-sm whitespace-nowrap">
                                <button onClick={()=>handleOrderDelete(prod.order_id).then(data=>getOrders().then(data=>setOrders(data)))} className="px-1 py-1 text-gray-500 text-red-500 transition-colors duration-200 rounded-lg  hover:bg-gray-100">
                                 X
                                </button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-6">
              <a
                href="#"
                className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 rtl:-scale-x-100"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                </svg>

                <span>previous</span>
              </a>

              <div className="items-center hidden md:flex gap-x-3">
                <a href="#" className="px-2 py-1 text-sm text-blue-500 rounded-md  bg-blue-100/60">
                  1
                </a>
                <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md   hover:bg-gray-100">
                  2
                </a>
                <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md   hover:bg-gray-100">
                  3
                </a>
                <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md   hover:bg-gray-100">
                  ...
                </a>
                <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md   hover:bg-gray-100">
                  12
                </a>
                <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md   hover:bg-gray-100">
                  13
                </a>
                <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md   hover:bg-gray-100">
                  14
                </a>
              </div>

              <a
                href="#"
                className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 "
              >
                <span>Next</span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 rtl:-scale-x-100"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </a>
            </div>
          </section>
        </Stack>
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}
