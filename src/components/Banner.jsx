import styled from 'styled-components';
import banner from '../assets/images/banner.png';

const Banner2 = styled.div`
  background-image: url(${props => props.banner}); 
  background-size: contain;
  width: 100%;
  height: 200px;
`;

export const Banner = () => {


  return (
    <>
      <Banner2  banner={banner}/>
    </>
  )

}