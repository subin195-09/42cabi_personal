import axios from 'axios';

export default function LentModal(props:any){

  const handleClick = () => {
    const local_url = "http://localhost:4242/lent";
    const dev_url = "/lent"
    axios.post(local_url, {cabinet_id : props.target}).then((res:any)=>{
      window.location.href="/return"
    }).catch((err)=>{console.log(err)});
  }

  return (
    <div className="modal" id="lentmodal" tabIndex={-1}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">선택한 사물함을 대여합니다.</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <p>사물함을 대여하시겠습니까?</p>
          </div>
          <div className="modal-footer justify-content-center">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">취소</button>
            <button type="button" className="btn btn-primary" onClick={handleClick}>대여</button>
          </div>
        </div>
      </div>
    </div>
  )
}

