import React from "react";
import useFetchApi from "../../hooks/useFetchApi";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, Container, Grid, TextField } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import SearchIcon from '@mui/icons-material/Search';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, searchCart } from "../../reduxtoolkit/slice/counterSlice";

const url = 'https://fakestoreapi.com/products';

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const {searchTerm}=useSelector((state)=>state.counter);

  const handleSearch=(e)=>{
    dispatch(searchCart(e.target.value));

  }

  const handleAdd = (item) => {
    dispatch(addToCart(item));
    navigate('/cart');
  };

  const { data, loading, error } = useFetchApi(url);

  if (loading) return <Typography>Loading...</Typography>; 
  if (error) return <Typography>Error loading products.</Typography>; 

  const filteredItem = data.filter((item)=>{return item.title.toLowerCase().includes(searchTerm.toLowerCase())});

  return (
    <>
    <Box sx={{mt:3,display:"flex",justifyContent:'right'}}>
    <TextField id="outlined-basic" label="search" color='secondary' variant="outlined" sx={{mx:2}} onChange={handleSearch}/>
  
    </Box>
    <Container sx={{ py: 4 }}>
      <Typography variant="h3" sx={{ textAlign: "center" ,mb:5}}>
        All Products
      </Typography>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {filteredItem && filteredItem.map((item) => (
            <Grid item xs={2} sm={4} md={4} key={item.id}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  sx={{ height: 200 }}
                  image={item.image}
                  alt={item.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5"  component={Link} to={`/${item.id}`} >
                    {item.title.length > 15 ? `${item.title.slice(0, 15)}...` : item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {item.description.length > 40 ? `${item.description.slice(0, 40)}...` : item.description}
                  </Typography>
                  <Typography variant="h6">
                    Price: ${item.price}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    startIcon={<ShoppingCartIcon />}
                    onClick={() => handleAdd(item)}
                  >
                    Add to Cart
                  </Button>
                  <Button variant="contained" startIcon={<LocalMallIcon />}>
                    Buy Now
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
    </>
  );
};

export default Products;
