import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
    0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
`;

const LoadingCircle = styled.div`
  display: block;
  width: 80px;
  height: 80px;
  ::after {
    content: ' ';
    display: block;
    width: 64px;
    height: 64px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid #fff;
    border-color: #fff transparent #fff transparent;
    animation: ${spin} 1.2s linear infinite;
  }
`;

export default function Loading() {
  return (
    <div className="modal fade show" role="dialog" tabIndex="-1" style={{ display: 'block', margin: 'auto' }}>
      <LoadingCircle style={{ margin: 'auto', marginTop: '100%' }} />
    </div>
  );
}
