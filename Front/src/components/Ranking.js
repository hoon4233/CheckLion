import React from 'react';
import styled, { css } from 'styled-components';

const Container = styled.div`
    width: 700px;
    height: 600px;
    background-color: pink;
    border-radius: 20px;
    opacity: 0.8;
    border: 1px;
`;

function Ranking() {
    return (
        <Container>
            rankinglist
        </Container>
    )
}

export default Ranking;