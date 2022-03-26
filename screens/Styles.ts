import styled from "styled-components"
import { Text, View } from "../components/Themed"


export const LoginButton = styled(Text)`
margin-bottom: 20px;
font-size: 10px;
font-weight: bold;
.row{
    font-size: 30px;
}
`

export const LoginInput = styled(Text)`
width: 80%;
box-sizing: border-box;
border: none;
font-size: 1.3rem;
padding-left: 1.5rem;
padding-bottom: 1rem;
box-shadow: inset 0px -3px 0px 0px rgba(187, 187, 187, 0.2);
transition: box-shadow 0.2s ease-in;
`
export const LoginBG = styled.body`
background: linear-gradient(135deg, rgba(34, 193, 195, 1) 0%, rgba(253, 187, 45, 1) 100%);
padding-left: 5rem;
padding-right: 5rem;
padding-top: 10px;
`
export const LoginPanel = styled(View)`
max-width: 500px;
  min-width: 300px;
  max-height: 700px;
  width: 30%;
  height: 60%;
  margin: 100px auto;
  background-color: #ffffff;
  border-radius: 25px;
`