import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetchApi from "../../hooks/useFetchApi";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, Container } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useDispatch } from "react-redux";
import { addToCart } from "../../reduxtoolkit/slice/counterSlice";



const Single_Product = () => {
  const { id } = useParams(); 
  const url = `https://fakestoreapi.com/products/${id}`;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
 
  const { data, loading, error } = useFetchApi(url);
  console.log(data);

  const handleAddToCart = () => {
    if (data) {
      dispatch(addToCart(data));
      navigate('/cart');
    }
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error</Typography>;

  return (
    
    <Container sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <Card sx={{ maxWidth: 600 }}>
          <CardMedia
            component="img"
            sx={{ height: 400 }}
            image={data?.image}
            alt={data?.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h4" component="div">
              {data?.title}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {data?.description}
            </Typography>
            <Typography variant="h5">
              Price: ${data?.price}
            </Typography>
          </CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <Button
              variant="contained"
              startIcon={<ShoppingCartIcon />}
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          </Box>
        </Card>
      </Box>
    </Container>
  );
};

export default Single_Product;
