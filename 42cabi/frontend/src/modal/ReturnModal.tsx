import axios from 'axios'

export default function ReturnModal(){

  const handleClick = () => {
    const local_url = 'http://localhost:4242/api/return';
    const dev_url = '/api/return';
    axios.post(local_url).then((res:any)=>{
      alert('반납되었습니다');
      window.location.href="/lent"
    }).catch(()=>{
      alert('다시 시도해주세요!');
    })
}
  return (
    <div className="modal" id="returnmodal" tabIndex={-1}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">이용 중인 사물함을 반납합니다.</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <p>사물함을 반납하시겠습니까?</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">취소</button>
            <button type="button" className="btn btn-primary" onClick={handleClick} >반납</button>
          </div>
        </div>
      </div>
    </div>
  )
}


