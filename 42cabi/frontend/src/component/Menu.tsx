import axios from 'axios'
import './menu.css'
import MenualModal from '../modal/MenualModal'
import {useHistory} from 'react-router-dom'

export default function Menu(props:any){
  const url = '/auth/logout';
  
	const history = useHistory();
  const handleClick = () => {
    axios.post(url).then((res)=>{
			history.push('/');
    }).catch(err=>console.log(err))
  }
  const cabinetPage = () =>{
    if (props.url === '/return')
      return '내 사물함';
    return '전체 사물함';
  };
  const dropdown = () =>{
    if (props.url === '/lent')
      return 'dropdownMenuReturn';
    return 'dropdownMenuLent';
  };
  return (
      <div className="dropdown text-right" id="menu">
        <button className="btn" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <i className="h2 bi bi-list"></i>
        </button>
        <div className="dropdown-menu start-50" id={dropdown()} aria-labelledby="dropdownMenuButton">
          <a className="dropdown-item" href={props.url}>{cabinetPage()}</a>
          <a className="dropdown-item" data-bs-toggle="modal" data-bs-target="#menualmodal">이용안내</a>
          {/* <a className="dropdown-item" href="#">대여 로그</a> */}
          <a className="dropdown-item" onClick={handleClick}>로그아웃</a>
        </div>
        <MenualModal></MenualModal>
      </div>
  )
}
