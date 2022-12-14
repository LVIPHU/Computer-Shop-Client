import { BackTop, Col, Row } from 'antd';
import Filter from '@/components/Filter';
import actions from '@/redux/actions/product';
import RelatedProduct from '@/views/Product/RelatedProduct';
import React from 'react';
import * as Redux from 'react-redux';
import AllProduct from './AllProduct';
import DiscountList from './DiscountList';
import FamousBrand from './FamousBrand';
import './index.scss';
import SaleOff from './SaleOff';

const HomePage = () => {
    const dispatch = Redux.useDispatch();

    // kéo về đầu trang
    document.querySelector('body').scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
    });

    // lấy sản phẩm
    React.useMemo(() => {
        dispatch(actions.getListProducts(1));
    }, []);

    return (
        <div className="Home">
            {/* Carousel cho sale off */}
            <div className="pos-relative">
                <SaleOff />
                <div className="filter-wrapper trans-center container w-100 h-80">
                    {/* <Filter /> */}
                </div>
            </div>

            <Row className="container max-w-7xl m-auto">
                {/* Danh sách sản phẩm khuyến mãi */}
                <Col className="m-tb-32" span={24}>
                    <DiscountList />
                </Col>

                <Col span={24} className="adv box-sha-home bor-rad-8 m-b-32">
                    <a href="https://www.apple.com/watch/" target="blank">
                        <img
                            className="adv-img w-100 bor-rad-8"
                            src="https://res.cloudinary.com/tuan-cloudinary/image/upload/v1608268459/others/1_iorzsj.webp"
                            alt="giam_gia"
                        />
                    </a>
                </Col>

                {/* Thương hiệu nổi bật */}
                <Col span={24} className="m-b-32 bg-white box-sha-home bor-rad-8">
                    <FamousBrand />
                </Col>

                {/* Sản phẩm bán chạy */}
                <Col span={24} className="m-b-32 hot-products box-sha-home bor-rad-8">
                    <RelatedProduct title="Sản phẩm bán chạy" type={0} />
                </Col>

                <Col span={24} className="adv box-sha-home bor-rad-8 m-b-32">
                    <a href="https://www.panasonic.com/vn/" target="blank">
                        <img
                            className="adv-img w-100 bor-rad-8"
                            src="https://res.cloudinary.com/tuan-cloudinary/image/upload/v1608268459/others/2_wapowv.webp"
                            alt="giam_gia"
                        />
                    </a>
                </Col>

                {/* Tổng hợp sản phẩm */}
                <Col span={24} className="m-b-32 bg-white box-sha-home bor-rad-8">
                    <AllProduct />
                </Col>
            </Row>
        </div>
    );
};

export default HomePage;
