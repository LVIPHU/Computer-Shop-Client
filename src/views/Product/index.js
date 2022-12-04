import { useSelector, useDispatch } from 'react-redux';
import GlobalLoading from '@/components/Loading/Global';
import ProductDetail from '@/components/ProductDetail';
import React from 'react';
import actionsProduct from '@/redux/actions/product';
import { useLocation, Navigate, useParams } from 'react-router-dom';

function ProductDetailPage() {
    const dispatch = useDispatch();
    const { productId } = useParams();
    let location = useLocation();

    const [isNotFoundProduct, setIsNotFoundProduct] = React.useState(false);

    const productDetail = useSelector((state) => state.productDetail);
    const { product, error } = productDetail;

    // lấy sản phẩm
    React.useEffect(() => {
        dispatch(actionsProduct.getDetailProduct(productId));
        if (error) {
            setIsNotFoundProduct(true);
        }
    }, [productId]);

    return (
        <>
            {product ? <ProductDetail product={product} /> : <GlobalLoading content="Đang tải sản phẩm ..." />}
            {isNotFoundProduct && <Navigate to="/" state={{ from: location }} replace />}
        </>
    );
}

export default ProductDetailPage;
