import { Product } from "../../app/models/product";
import { Avatar, Button, ListItem, List, ListItemAvatar, ListItemText } from "@mui/material";

interface Props {
    products: Product[];
    addProduct: () => void;
}

export default function Catalog({products, addProduct}: Props) {
    return (
        <>
            <List>
                {products.map((product) => (
                    <ListItem key={product.id}>
                        <ListItemAvatar>
                            <Avatar alt="Sam" src={product.pictureUrl}/>
                        </ListItemAvatar>
                        <ListItemText>
                            {product.name} - ${product.price.toFixed(2)}
                        </ListItemText>
                    </ListItem>
                ))}
            </List>
            <Button variant="contained" onClick={addProduct}>Add Product</Button>
        </>
    )
}