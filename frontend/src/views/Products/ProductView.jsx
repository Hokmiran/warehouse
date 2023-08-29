import { useEffect, useState } from "react";
import { privateAxios } from "../../utils/privateAxios";
import { useParams } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import './Category.css';

const ProductView = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [isPending, setIsPending] = useState(true);

    const getData = async () => {
        try {
            setIsPending(true);
            let res = await privateAxios.get(`/products/${id}`);
            setProduct(res.data);
        } catch (error) {
            console.error("Error fetching product:", error);
            setProduct({});
        } finally {
            setIsPending(false);
        }
    };

    useEffect(() => {
        getData();
    }, [id]);

    return (
        <Layout>
            <div>
                {isPending ? (
                    <SkeletonTheme>
                        <Skeleton animation="wave" count={10}/>
                    </SkeletonTheme>
                ) : (
                    <>
                        <div className="product-image">
                            <img src={product.image?.filePath} alt={product.productName} />
                        </div>
                        <div className="product-info">
                            <h2 className="product-name">{product.productName}</h2>
                            <p className="product-category">Category: {product.category.name}</p>
                            <p className="product-price">Price: ${product.price}</p>
                            <p className="product-quantity">Quantity: {product.quantity}</p>
                            <p className="product-description">Description: {product.description}</p>
                            <p className="product-created-at">Created At: {new Date(product.createdAt).toLocaleDateString()}</p>
                        </div>
                    </>
                )}
            </div>
        </Layout>
    );
};

export default ProductView;
