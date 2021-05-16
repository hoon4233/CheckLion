import React from "react";
import styled from 'styled-components';

const Team = {
    rank: 1,
    name: "코딩을 하지로",
    score: 42
}

const Container = styled.div`
    /* background-color: purple; */
    display: flex;
    width: 100%;
    height: auto;
`;

const ItemContainer = styled.div`
    /* background-color: orange; */
    width: 30%;
    text-align: center;
    margin-left: 9.5px;
    margin-right: 9.5px;
    margin-bottom: 3px;
    margin-top: 3px;
`;

const Item = styled.p`
    font-size: 20px;
    font-family: 'S-CoreDream-3Light';
`;


function RankingItem({rank, name, score}) {
    return (
        <Container>
            <ItemContainer>
                <Item>{rank}</Item>
            </ItemContainer>
            <ItemContainer>
                <Item>{name}</Item>
            </ItemContainer>
            <ItemContainer>
                <Item>{score}</Item>
            </ItemContainer>
        </Container>
    )
}

export default RankingItem;