import React from 'react';
import styled from "styled-components";

export interface NavBarProps {
    type: boolean;
}

export const NavBar: React.FC<NavBarProps> = ({ type }) => {
    return (
      <Container>
        <Text disabled={disabled}>
          {disabled ? "Install" : "Connect"}  Wallet
        </Text>
      </Container>
    );
};


const Container = styled.button<{disabled: boolean }>`
    display: flex;
    text-decoration: none;
    border: none;
    border-radius: 4px;
    align-items: center;
    cursor: ${(p) => (p.disabled ? "not-allowed" : "pointer")};
    justify-content: space-between;
`;
 
const Text = styled.span<{ disabled: boolean }>`
    font-family: "SF Pro", sans-serif;
    letter-spacing: -0.025em;
    font-weight: 600;
    padding: 8px 16px;
`;