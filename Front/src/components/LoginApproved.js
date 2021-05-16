import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

//Login 버튼을 누르면 로그인 페이지로 이동
//로그인에 성공하면 Login 버튼이 '환영합니다, oo님'으로 바뀜

function LoginApproved() {
    const [Login, setLogin] = useState(false);
    return (
        <div>
            <section>
                {Login
                ? (<span>
                    환영합니다, 사자님
                </span>
                ) : (
                <span>
                    LOGIN
                </span>)
            }
            </section>
            <p>click the button</p>
            <button onClick={() => setLogin(true)}>
                LOGIN
            </button>
        </div>

    )
}

export default LoginApproved;
