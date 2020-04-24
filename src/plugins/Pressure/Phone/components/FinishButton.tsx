import React from 'react';
import { Button as Btn } from 'bonde-components';
import styled from 'styled-components';

const Button = styled(Btn)`
  && {
    background-color: ${props => props.backgroundColor};
    border-radius: 2px;
    width: 100%;
  }
`;
const Wrapper = styled.div`
  margin: 1rem 0;
  padding: 0 1rem;
`;
const FinishButton = ({
  buttonColor,
  toggleFinishMessage,
}: {
  buttonColor: string;
  toggleFinishMessage: any;
}) => {
  return (
    <Wrapper>
      <Button
        type="button"
        backgroundColor={buttonColor}
        onClick={(e: any) => {
          e.preventDefault();
          toggleFinishMessage(true);
        }}
      >
        Encerrar e compartilhar
      </Button>
    </Wrapper>
  );
};

export default FinishButton;