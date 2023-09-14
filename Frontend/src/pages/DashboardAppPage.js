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
import OrdersPage from './OrdersPage';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();

  const [totalOrders, setTotalOrders] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [deliveredOrders, setDeliveredOrders] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);


  const getAllOrders = async () => {
    const res = await axios.get('http://localhost:5204/getAllOrders', {
      withCredentials: false
    },
    ).catch(e => setTotalOrders(-1)).then(
      res => (
        res.data.length ? setTotalOrders(res.data.length) : setTotalOrders('No Orders Yet')
      )
    )
  };

  const getPendingOrders = async () => {
    const res = await axios.get('http://localhost:5204/getAllOrders', {
      withCredentials: false
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
      withCredentials: false
    },
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
      withCredentials: false
    },
    ).catch(e => setTotalProducts(-1)).then(
      res => (
        res.data.length ? setTotalProducts(res.data.length) : setTotalProducts('No Products Yet')
      )
    )
  };

  useEffect(() => {
   setInterval(() => {
    getAllOrders();
    getPendingOrders();
    getDeliveredOrders();
    getAllProducts();
   }, 10000);
  }, [])



  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back <span className='font-bold text-2xl text-blue-400'>{JSON.parse(localStorage.getItem('user')).user_name}</span>
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total Orders" total={totalOrders} imageSrc={'/assets/icons/ic_order.svg'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Pending Orders" total={pendingOrders} color="info" imageSrc={'/assets/icons/ic_pending_order.svg'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Orders Delivered" total={deliveredOrders} color="warning" imageSrc={'/assets/icons/ic_deliver.svg'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total Products" total={totalProducts} color="error" imageSrc={'/assets/icons/ic_customer.svg'} />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Top Selling Products"
              chartData={[
                { label: 'America', value: 4344 },
                { label: 'Asia', value: 5435 },
                { label: 'Europe', value: 1443 },
                { label: 'Africa', value: 4443 },
                { label: 'India', value: 4443 },
                { label: 'India', value: 4443 },
              ]}
            // chartColors={[
            //   theme.palette.primary.main,
            //   theme.palette.info.main,
            //   theme.palette.warning.main,
            //   theme.palette.error.main,
            // ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates
              title="Inventory Levels"
              subheader="(+43%) than last year"
              chartData={[
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 },
                { label: 'United Kingdom', value: 1380 },
              ]}
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
              list={[
                { id: '1', label: 'Create FireStone Logo' },
                { id: '2', label: 'Add SCSS and JS files if required' },
                { id: '3', label: 'Stakeholder Meeting' },
                { id: '4', label: 'Scoping & Estimations' },
                { id: '5', label: 'Sprint Showcase' },
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
