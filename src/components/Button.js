import styled from 'styled-components';
import { StyledLink } from './StyledLink';

export const Button = styled(StyledLink)`
  display: block;
  border-radius: 3px;
  padding: 0.5rem 0;
  margin: auto 0;
  width: 11rem;
  background: transparent;
  color: black;
  text-decoration: none;
  text-align: center;
  border: 1px solid #ddd;
  &:hover {
    background: var(--color-accent);
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;