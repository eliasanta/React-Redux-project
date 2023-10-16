import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux"
import { selectedProduct, removeSelectedProduct, addToCart, removeFromCart } from '../redux/actions/productActions';
import 'semantic-ui-css/semantic.min.css'
import LoadingLottie from '../LoadingLottie';

const ProductDetail = () => {
    const product = useSelector(state => state.product),
        { productId } = useParams(),//si collega al path e prende la parte con i ":" /product/:productId
        { image, title, price, category, description } = product,
        dispatch = useDispatch(),
        fetchProductDetail = async () => {
            const response = await axios.get(`https://fakestoreapi.com/products/${productId}`)
                .catch(err => console.log(err));
            dispatch(selectedProduct(response.data))
        }
    useEffect(() => {
        if (productId && productId !== "") fetchProductDetail(productId);
        return () => {
            dispatch(removeSelectedProduct());
        };
    }, [productId]);
    // const selectedProduct2 = useSelector(state => console.log(state));
    const handleAddToCart = () => {
        dispatch(addToCart({ ...product }));
    },
        handleRemoveFromCart = () => {
            dispatch(removeFromCart({ ...product }));
        };


    const cart = useSelector(state => state.cart);
    return (
        <div className="ui grid container" style={{ marginTop: "5%" }}>
            {Object.keys(product).length === 0 ? (
                <div style={{ margin: "0 auto" }}><LoadingLottie /></div>
            ) : (
                <div className="ui placeholder segment" style={{ margin: "0 auto", width: "85%" }}>
                    <div className="ui two column stackable center aligned grid">
                        <div className="ui vertical divider"></div>
                        <div className="middle aligned row">
                            <div className="column lp">
                                <img className="ui fluid image" src={image} />
                            </div>
                            <div className="column rp">
                                <h1>{title}</h1>
                                <h2>
                                    <a className="ui teal tag label">${price}</a>
                                </h2>
                                <h3 className="ui brown block header">{category}</h3>
                                <p>{description}</p>
                                <div className="ui vertical animated button blue" onClick={handleAddToCart} tabIndex="0">
                                    <div className="hidden content">
                                        <i className="shop icon"></i>
                                    </div>
                                    <div className="visible content" >Add to Cart</div>
                                </div>
                                <div className="ui vertical animated button red" onClick={handleRemoveFromCart} tabIndex="0">
                                    <div className="hidden content">
                                        <i className="shop icon"></i>
                                    </div>
                                    <div className="visible content" >Remove from cart</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetail;