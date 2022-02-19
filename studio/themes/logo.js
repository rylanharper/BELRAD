import React from 'react'
import styled, { css } from 'styled-components'

const Logo = ({ projectName }) => {
  return (
    <Icon isLogin={projectName}>
      <svg xmlns="http://www.w3.org/2000/svg" width="250" height="80" viewBox="0 0 236 44">
        <path d="M0,0H18.16C28.35,0,33,3.87,33,11.39c0,5.73-3.27,9.07-8.78,10.41v.67c7.52.82,10.94,3.87,10.94,10.12,0,7.07-4.47,12.06-15.48,12.06H0ZM6.85,5.43V19.87H17.93c5.07,0,8.49-2,8.49-7.44,0-4.69-2.31-7-8-7Zm0,19.5V39.29H19.5c6.17,0,8.93-2.9,8.93-7.22,0-4.54-2.38-7.14-9.3-7.14Z" />
        <path d="M39.29,0h31V6H46.14V19H67.87v5.95H46.14V38.62H70.25v6h-31Z" />
        <path d="M84.39,38.47h20.83v6.18H77.54V0h6.85Z" />
        <path d="M126.73,26.94H117.2V44.65h-6.84V0h18c11,0,15.92,4.76,15.92,13.1,0,7.07-3.79,11.68-10.71,13.24L146.9,43.83v.82H139ZM117.2,5.8V21.06h10.5c6.32,0,9.82-2.53,9.82-7.81,0-5-2.46-7.45-9.75-7.45Z" />
        <path d="M180.76,32.15H160.59l-4.54,12.5H148.9L166.24,0h9.08l17.27,44.65h-7.3Zm-18.31-5.21h16.37l-2-5.51C175,16.45,173,10.72,171.6,6h-1.86c-1.49,4.76-3.42,10.42-5.28,15.4Z" />
        <path d="M195.94,0h17.41c15.1,0,22.32,7.81,22.32,22s-8.41,22.62-22.17,22.62H195.94Zm6.84,5.73V38.92H212.9c11.46,0,16-6.33,16-16.89,0-11.24-4.91-16.3-16.44-16.3Z" />
      </svg>
    </Icon>
  )
}

const Icon = styled.div`
  display: block;
  width: auto;
  height: 2em;
  max-width: 100%;
  margin: -0.75rem auto;
  color: white;
  ${(props) =>
    props.isLogin &&
    css`
      display: block;
      margin: 0 auto;
      height: 4rem;
      color: black;
    `}
  svg {
    display: block;
    margin: 0 auto;
    height: 100% !important;
    width: auto;
    fill: currentColor;
  }
`

export default Logo
