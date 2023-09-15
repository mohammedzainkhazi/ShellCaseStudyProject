import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import axios from 'axios';

// sections
import {
  AppTasks,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWidgetSummary,
  AppConversionRates,
} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();

  const [totalOrders, setTotalOrders] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [deliveredOrders, setDeliveredOrders] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [topProducts, setTopProducts] = useState([]);
  const [pendingTasks, setPendingTasks] = useState([]);
  const [inventoryQty, setinventoryQty] = useState([]);

  const getAllOrders = async () => {
    const res = await axios.get('http://localhost:5204/getAllOrders', {
     headers: {'Authorization':`Bearer ${localStorage.getItem('token')}`}
    },
    ).catch(e => setTotalOrders(-1)).then(
      res => (
        res.data.length ? setTotalOrders(res.data.length) : setTotalOrders('No Orders Yet')
      )
    )
  };

  const getPendingOrders = async () => {
    const res = await axios.get('http://localhost:5204/getAllOrders', {
     headers: {'Authorization':`Bearer ${localStorage.getItem('token')}`}
    },
    ).catch(e => setPendingOrders(-1)).then(
      res => (res.data.filter(row => (
        row.status === 'Placed'
      )
      ))
    ).then(data=>data.length ? setPendingOrders(data.length) : setPendingOrders('No Orders Yet')
    )
  };

  const getDeliveredOrders = async () => {
    const res = await axios.get('http://localhost:5204/getAllOrders', {
     headers: {'Authorization':`Bearer ${localStorage.getItem('token')}`}
    },
    {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}` 
      }
    }
    ).catch(e => setDeliveredOrders(-1)).then(
      res => (res.data.filter(row => (
        row.status === 'Delivered'
      )
      ))
    ).then(data=>data.length ? setDeliveredOrders(data.length) : setDeliveredOrders('No Orders Yet')
    )
  };

  const getAllProducts = async () => {
    const res = await axios.get('http://localhost:5204/getAllProducts', {
     headers: {'Authorization':`Bearer ${localStorage.getItem('token')}`}
    },
    ).catch(e => setTotalProducts(-1)).then(
      res => (
        res.data.length ? setTotalProducts(res.data.length) : setTotalProducts('No Products Yet')
      )
    )
  };
  const getTopProducts = async () => {
    const res = await axios.get('http://localhost:5204/getTopProducts', {
     headers: {'Authorization':`Bearer ${localStorage.getItem('token')}`}
    },
    ).catch(e => setTopProducts([])).then(
      res => (
        res.data.length ? setTopProducts(res.data) : setTopProducts([])
      )
    )
  };

  const getPendingTasks = async () => {
    const res = await axios.get('http://localhost:5204/getAllOrders', {
     headers: {'Authorization':`Bearer ${localStorage.getItem('token')}`}
    },
    ).catch(e => setPendingOrders(-1)).then(
      res => (res.data.filter(row => (
        row.status === 'Placed'
      )
      ))
    ).then(data=>data.length>=1 ? setPendingTasks(data) : setPendingTasks([])
    )
  };

  const getInventoryQty = async () => {
    const res = await axios.get('http://localhost:5204/getAllInventories', {
     headers: {'Authorization':`Bearer ${localStorage.getItem('token')}`}
    },
    ).then(data=>data.length>=1 ? console.log(data) : setinventoryQty([])
    )
  };

  useEffect(() => {
    getAllOrders();
    getPendingOrders();
    getDeliveredOrders();
    getAllProducts();
    getTopProducts();
    getPendingTasks();
    getInventoryQty()
   setInterval(() => {
    getAllOrders();
    getPendingOrders();
    getDeliveredOrders();
    getAllProducts();
    getTopProducts();
    getPendingTasks();
    getInventoryQty();
   }, 10000);
  }, [])



  return (
    <>
      <Helmet>
        <title> Dashboard </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back{' '}
          <span className="font-bold text-2xl text-blue-400">{JSON.parse(localStorage.getItem('user')).user_name}</span>
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total Orders" total={totalOrders} imageSrc={'/assets/icons/ic_order.svg'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Pending Orders"
              total={pendingOrders}
              color="info"
              imageSrc={'/assets/icons/ic_pending_order.svg'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Orders Delivered"
              total={deliveredOrders}
              color="warning"
              imageSrc={'/assets/icons/ic_deliver.svg'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Total Products"
              total={totalProducts}
              color="error"
              imageSrc={'/assets/icons/ic_customer.svg'}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Top Selling Products"
              chartData={
              topProducts
            }
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates
              title="Inventory Levels"
              subheader="(+43%) than last year"
              chartData={
              inventoryQty
              }
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Order Timeline"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  '1983, orders, $4220',
                  '12 Invoices have been paid',
                  'Order #37745 from September',
                  'New order placed #XF-2356',
                  'New order placed #XF-2346',
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppTasks
              title="Pending Orders"
              list={
                pendingTasks
              }
              getPendingTasks={getPendingTasks}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
