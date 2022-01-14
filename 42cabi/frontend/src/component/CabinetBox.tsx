export default function CabinetBox(props:any){
    const clickHandler = () => {
        props.setTarget(props.cabinet_id);
    }
    return (
        <div className={`border text-center${props.intra_id !== "" ? ' bg-secondary' : ''}`}  data-bs-toggle={props.intra_id !== '' ? '':'modal'} data-bs-target="#lentmodal" onClick={clickHandler}>
            <div>{props.cabinet_num}</div>
            <div>{props.intra_id}</div>
        </div>
    );
}
