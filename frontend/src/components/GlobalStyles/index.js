import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const globalStyles = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css?family=Nanum+Gothic&display=swap');
    ${reset};
    a{
        text-decoration:none;
        font-weight: 400;
        color:inherit;
        font-size: 14px;
    }
    *{
        box-sizing: boder-box;
    }
    body{
        font-family:Arial, 'Nanum Gothic', sans-serif;
        font-size: 14px;
        background: #FFFFFF;
        color: black;
        line-height: 1.2;
    }
`;
export default globalStyles;