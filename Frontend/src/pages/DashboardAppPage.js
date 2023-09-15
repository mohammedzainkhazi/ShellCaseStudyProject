import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
import axios from 'axios';

// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import TimeLineView from './AppTimeLineView';

// sections
import {
  AppTasks,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWidgetSummary,
  AppConversionRates,
} from '../sections/@dashboard/app';


// import './DashboardAppPage.css'
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
  const [timeLine, setTimeLine] = useState([]);

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
    ).then(data=>data.length ? console.log(data) : setinventoryQty([])
    )
  };
  const getOrdersTimeline = async () => {
    const res = await axios.get('http://localhost:5204/getAllOrders', {
      headers: {'Authorization':`Bearer ${localStorage.getItem('token')}`}
     },
     ).catch(e => setTotalOrders(-1)).then(
       res => (
         res.data.length ? setTimeLine(res.data) : setTimeLine([])
       )
     )
  };

  useEffect(() => {
    getAllOrders();
    getPendingOrders();
    getDeliveredOrders();
    getAllProducts();
    getTopProducts();
    getPendingTasks();
    getInventoryQty();
    getOrdersTimeline();
   setInterval(() => {
    getAllOrders();
    getPendingOrders();
    getDeliveredOrders();
    getAllProducts();
    getTopProducts();
    getPendingTasks();
    getInventoryQty();
    getOrdersTimeline();
   }, 10000);
  }, [])

  function DateDisplay(dateStr) {
    const inputDate = new Date(dateStr);
    const year = inputDate.getFullYear();
    const month = String(inputDate.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const day = String(inputDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }

  return (
    
    <>
      <Helmet>
        <title> Dashboard </title>
      </Helmet>
{/* 
      <Container maxWidth="xl" sx={{ background: '#fae9ca',  padding: 0, margin: 0 }}>
        <Typography variant="h4" sx={{ mb: 5, fontFamily: 'ui-sans-serif',  fontWeight: 'bold', marginTop: '20px', marginLeft: '3px'}} >
          Hi, Welcome back <span className='font-bold text-2xl text-[#fc5c09]'>{JSON.parse(localStorage.getItem('user')).user_name}</span> */}
      <Container maxWidth="xl" sx={{ background: 'rgba(250, 233, 202, 0)',  padding: 0, margin: 0 }}>
        <Typography variant="h4" sx={{ mb: 5, fontFamily: 'ui-sans-serif',  fontWeight: 'bold', marginTop: '20px', marginLeft: '3px' }}>
          Hi, Welcome back{' '} 
          <span className='font-bold text-2xl text-[#fc5c09]'>{JSON.parse(localStorage.getItem('user')).user_name}</span>        </Typography>

        <Grid container spacing={3}>
       
          <Grid item xs={12} sm={6} md={3}>
          <div data-aos="zoom-in-up">
            <AppWidgetSummary title="Total Orders" total={totalOrders} imageSrc={'/assets/icons/ic_order.svg'} />
            </div>
          </Grid>

      
          <Grid item xs={12} sm={6} md={3}>
          <div data-aos="zoom-in-up">
          <AppWidgetSummary
              title="Pending Orders"
              total={pendingOrders}
              color="info"
              imageSrc={'/assets/icons/ic_pending_order.svg'}
            />
            </div>
            </Grid>
    
          
          <Grid item xs={12} sm={6} md={3}>
          <div data-aos="zoom-in-up">
          <AppWidgetSummary
              title="Orders Delivered"
              total={deliveredOrders}
              color="warning"
              imageSrc={'/assets/icons/ic_deliver.svg'}
            />
             </div>
            </Grid>
            
            {/* <AppWidgetSummary
              title="Pending Orders"
              total={pendingOrders}
              color="info"
              imageSrc={'/assets/icons/ic_pending_order.svg'}
            />
          </Grid> */}

          {/* <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Orders Delivered"
              total={deliveredOrders}
              color="warning"
              imageSrc={'/assets/icons/ic_deliver.svg'}
            />
          </Grid> */}

          
          <Grid item xs={12} sm={6} md={3}>
          <div data-aos="zoom-in-up">
            <AppWidgetSummary title="Total Products" total={totalProducts} color="success" imageSrc={'/assets/icons/ic_product.svg'} />
            </div>
            </Grid>
          
          <Grid item xs={12} md={6} lg={4}>
          <div data-aos="fade-right">
            <AppCurrentVisits
              title="Top Selling Products"
              chartData={
              topProducts
            }
            />
            </div>
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
          <div data-aos="fade-left">
            <AppConversionRates
              title="Inventory Levels"
              subheader="(+43%) than last year"
              chartData={
              inventoryQty
              }
            />
            </div>
          </Grid>
          <Grid item xs={10} md={6} lg={6}>
            <div  className='!w-full bg-white rounded-xl '>
              <div className='text-blue-500 font-bold p-5'>Orders TimeLine</div>
              {
              timeLine.map((order,i)=>(
                <div className='text-black w-full text-sm p-5 flex-row flex justify-around items-center' key={i}>
                  <span className='text-orange-400'>{order.product_name}</span><br/>
                  <span className='text-black pr-5'> Order Placed On  :{'  '} <span className='text-gray-500'>{DateDisplay(order.order_date)}</span></span>
                </div>
              ))
              }
            </div>
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <div data-aos="fade-left">
            <AppTasks
              title="Pending Orders"
              list={
                pendingTasks
              }
              getPendingTasks={getPendingTasks}
            />
            </div>
          </Grid>
          {/* <Grid item xs={12} md={6} lg={8}>
  <div className='flex h-screen w-screen items-center justify-center'>
    <div className='group relative cursor-pointer border border-gray-700 p-12 rounded-full transition ease-in-out duration-500 hover:border-gray-300 hover:scale-110'>
      <div className='uppercase text-6xl flex items-center relative'>
        {"Hello".split("").map((letter, i) => (
          <div
            key={i}
            className='origin-top transition-transform duration-300 ease-in-out group-hover:scale-y-0'
            style={{ transitionDelay: `${i * 75}ms` }} // Use correct interpolation
          >
            {letter}
          </div>
        ))}
      </div>
      <div className='uppercase text-6xl absolute bottom-0 left-0 flex items-center'>
        {"Hello".split("").map((letter, i) => (
          <div
            key={i}
            className='origin-bottom transition-transform duration-300 ease-in-out scale-y-0 group-hover:scale-y-100'
            style={{ transitionDelay: `${i * 75}ms` }} // Use correct interpolation
          >
            {letter}
          </div>
        ))}
      </div>
    </div>
  </div>
</Grid> */}

        </Grid>
      </Container>
      
    </>
  );
}
