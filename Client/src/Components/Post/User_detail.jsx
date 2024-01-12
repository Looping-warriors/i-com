//has the user info for the post
import { styled } from "styled-components";

import user_pic from "../../assets/logo.png"
import {Link, useNavigate} from "react-router-dom"
import { useAuth } from "../../context/auth";
const User_detail = (props) => {
const navigate=useNavigate();
console.log(props);
  return (
    <Container>
      <div className="frame">
        <Link to="/profile"><img src={props.profilePicUrl} alt="pic" /></Link>
      <div className="frame_content">
      <div className="user_name" onClick={()=>{navigate(`/profile/${props.userName}`)}}>{props.userName}</div>
        <div className="date">Posted on 22 Jan</div>
        </div>
      </div>
      
    </Container>
  );
};

export default User_detail;




const Container=styled.div`
.frame{
  display: flex;
  align-items: center;
  img{
      height: 50px;
      width:50px;
      border-radius: 100%;
    }
    .user_name{
      font-size: 1em;
      cursor: pointer;
      display: inline;
      &:hover{
        
        background-color: #F6F6F6;
        transition: cubic-bezier(0.165, 0.84, 0.44, 1);
      }
  }
  .frame_content{
      margin-left:15px;
  }
  .date{
      color:rgb(113, 113, 113);
      font-size: 0.9em;
  }
}
`