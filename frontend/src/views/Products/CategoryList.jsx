import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout"
import { privateAxios } from "../../utils/privateAxios";
import NoData from "../../components/lottie/NoData";
import './Category.css';
// import { Link } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Link } from "react-router-dom";


const CategoryList = () => {
    const [list, setList] = useState([]);
    const [isPending, setIsPending] = useState(true);

    // Get all categories
    const getCategories = async () => {
        try {
            let res = await privateAxios.get(`/products/categories`);
            setList(res.data);
        } catch (error) {
            setList([]);
        } finally {
            setIsPending(false);
        }
    };


    useEffect(() => {
        getCategories();
    }, []);

    return (
        <Layout>
            <div>
                <div className="main-card mb-3 card">
                    <div className="card-body">
                        <div className="w-100 d-flex justify-content-between mb-3">
                            <h5 className="card-title">Product Categories</h5>
                        </div>
                        {isPending ? (
                            <SkeletonTheme>
                                <Skeleton animation="wave" count={5} />
                            </SkeletonTheme>
                        ) : list.length > 0 ? (
                            <div className="category-list">
                                {list.map((item) => (
                                    <Link
                                        to={`/products-category/${item?._id}`}
                                        key={item?._id}
                                        className="category-item"
                                        style={{ color: "black" }}
                                    >
                                        <div
                                            className="category-item"
                                        >
                                            <div className="category-card">
                                                <div className="category-content">
                                                    <div className="category-name">{item?.name}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <NoData />
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CategoryList;