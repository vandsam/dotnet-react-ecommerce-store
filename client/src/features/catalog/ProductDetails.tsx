import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Product } from "../../app/models/product";
import {
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetails = async (id: string | undefined) => {
      try {
        const response = await axios.get(
          `http://localhost:5264/api/products/${id}`
        );

        setProduct(response.data);
      } catch (error) {
        console.error("ERROR", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails(id);
  }, [id]);

  // 1. On initial component render, this function component will return 'Loading...' and below code will not execute
  if (loading) return <h3>Loading...</h3>;

  // 2. After GET request is finished, component will re-render because the component state updated
  // #1 will not return as the loading state is updated to false. If product is null, then this 'Product not found' will return
  if (!product) return <h3>Product not found</h3>;

  // 3. After GET request is finished, and if we get a product from the DB then this code will return
  return (
    <Grid container spacing="6">
      <Grid item xs={6}>
        <img
          src={product.pictureUrl}
          alt={product.name}
          style={{ width: "100%" }}
        />
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h3">{product.name}</Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="h4" color="secondary">
          ${(product.price / 100).toFixed(2)}
        </Typography>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>{product.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>{product.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>{product.type}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Brand</TableCell>
                <TableCell>{product.brand}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Quantity in Stock</TableCell>
                <TableCell>{product.quantityInStock}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
