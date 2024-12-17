import React from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  IconButton,
  Card,
  CardMedia,
  CardContent,
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, state, updateCart } from "../../reduxtoolkit/slice/counterSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItem } = useSelector((state) => state.counter);
  console.log(cartItem);

  const totalQuantity = cartItem.reduce((total, item) => total + item.qty, 0);
  const totalAmount = cartItem.reduce((total, item) => total + (item.qty * item.price), 0);

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };
  const handleUpdate = (id, qty) => {
    qty > 0
    ?dispatch(updateCart({id, qty}))
    : ''
  };
  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {cartItem.map((item) => (
            <Card key={item.id} sx={{ display: "flex", marginBottom: 2 }}>
              <CardMedia
                component="img"
                sx={{ width: 151 }}
                image={item.image}
                alt={item.title}
              />
              <CardContent
                sx={{
                  flex: "1 0 auto",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Typography component="div" variant="h6">
                  {item.title}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  ${item.price}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <IconButton onClick={()=>handleUpdate(item.id,item.qty-1)}>
                    <RemoveIcon />
                  </IconButton>
                  <Typography>{item.qty}</Typography>
                  <IconButton
                    onClick={() => handleUpdate(item.id, item.qty + 1)}
                  >
                    <AddIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleRemove(item.id)}
                    color="error"
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography>Total Quantity:</Typography>
              <Typography>{totalQuantity}</Typography>
            </Box>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            >
              <Typography>Total Amount:</Typography>
              <Typography>${totalAmount.toFixed(2)}</Typography>
            </Box>
            <Button variant="contained" color="primary" fullWidth>
              Proceed to Checkout
            </Button>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Cart;
