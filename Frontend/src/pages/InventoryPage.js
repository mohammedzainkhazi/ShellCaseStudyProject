import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
// @mui
import { Stack, Button, Popover, MenuItem, Container, Typography } from '@mui/material';

import axios from 'axios';

// components
import Iconify from '../components/iconify';
import AddInventoryModal from '../components/AddInventoryModal';
// sections
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'inventory_id', label: 'Id', alignRight: false },
  { id: 'location_name', label: 'Location', alignRight: false },
  { id: 'product_name', label: 'Product', alignRight: false },
  { id: 'quantity_available', label: 'Quantity', alignRight: false },
  { id: 'last_updated', label: 'Last Updated', alignRight: false },
];

export default function InventoryPage() {
  const [open, setOpen] = useState(null);

  const [inventories, setInventories] = useState([]);

  // const [page, setPage] = useState(0);

  // const [order, setOrder] = useState('asc');

  // const [selected, setSelected] = useState([]);

  // const [orderBy, setOrderBy] = useState('name');

  // const [filterName, setFilterName] = useState('');

  // const [rowsPerPage, setRowsPerPage] = useState(5);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const addInventory = (newInventory) => {
    // Add the new product to the list
    setInventories([...inventories, newInventory]);
    console.log(inventories);
  };

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };
  // ----------------------------------------------------------------------

  const getInventories = async () => {
    const res = await axios.get('http://localhost:5204/getAllInventories', {
           headers: {'Authorization':`Bearer ${localStorage.getItem('token')}`}
    },
    ).catch(e => console.log(e));

    if (res.data !== null) {
      return res.data;
    }
    return [];
  };

  useEffect(() => {
    getInventories().then((data) => setInventories(data));
  }, []);

  return (
    <>
      <Helmet>
        <title> Inventories </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} sx={{marginBottom: '10px'}}>
          <Typography variant="h4" gutterBottom sx={{fontFamily: 'ui-sans-serif',  fontWeight: 'bold', marginTop: '20px', marginLeft: '14px'}}>
          <span style={{ fontSize: '1.2em' }}>I</span>nventories
          </Typography>
          <Button
            className="!bg-blue-500"
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={openModal}
          >
            New Inventory
          </Button>

          <AddInventoryModal isOpen={isModalOpen} onClose={closeModal} onAddInventory={addInventory} />
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
                              className="px-12 py-3.5 text-sm font-bold text-left rtl:text-right text-gray-500 "
                            >
                              {head.label}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200  ">
                        {inventories.map((prod, i) => (
                          <tr key={i}>
                            <td className="px-12 py-4 text-sm font-normal text-gray-700 whitespace-nowrap">
                              {prod.inventory_id}
                            </td>
                            <td className="px-12 py-4 text-sm font-normal text-gray-700 whitespace-nowrap">
                              {prod.location_name}
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-500 text-center whitespace-nowrap">
                              {prod.product_name}
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-500 text-center whitespace-nowrap">
                              {prod.quantity_available}
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-500 text-center whitespace-nowrap">
                              {prod.last_updated}
                            </td>
                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                              <button className="px-1 py-1 text-gray-500 transition-colors duration-200 rounded-lg  hover:bg-gray-100">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="w-6 h-6"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                                  />
                                </svg>
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
