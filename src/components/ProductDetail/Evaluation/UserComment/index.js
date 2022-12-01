import { Avatar, Button, Comment, Rate } from 'antd';
import constants from '@/utils/constants';
import helpers from '@/utils//helpers';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useLocation, Navigate } from 'react-router-dom';

function UserComment(props) {
    const { comment } = props;
    let location = useLocation();
    const { author, time, rate, content, nLike, replies } = comment;
    const { name, avt } = author;
    const isReduceCmt = content.length >= 200 ? true : false;
    const [isMore, setIsMore] = useState(false);
    const [loginRedirect, setLoginRedirect] = useState(false);
    // rendering ...
    return (
        <>
            {/* đăng nhập để nhận xét */}
            {loginRedirect && <Navigate to="/" state={{ from: location }} replace />}

            {/* Comment */}
            <Comment
                author={<b className="font-size-14px">{name}</b>}
                avatar={<Avatar src={avt !== '' ? avt : constants.DEFAULT_USER_AVT} alt={name} />}
                content={
                    <>
                        {rate !== -1 && (
                            <>
                                <Rate defaultValue={rate + 1} disabled style={{ fontSize: 14 }} />
                                <h3>{helpers.convertRateToText(rate)}</h3>
                            </>
                        )}

                        <p className="t-justify">
                            {isMore ? content : content.slice(0, 200)}
                            {isReduceCmt && (
                                <Button type="link" onClick={() => setIsMore(!isMore)}>
                                    {isMore ? 'Thu gọn' : 'Xem thêm'}
                                </Button>
                            )}
                        </p>
                    </>
                }
                datetime={<span>{helpers.formatDate(time)}</span>}
            />
        </>
    );
}

UserComment.propTypes = {
    comment: PropTypes.object,
};

export default UserComment;
