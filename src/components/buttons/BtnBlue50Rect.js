import './BtnBlueRect.css';

function BtnBlue50Rect(props) {
    return (
      <div className="btnBlue50Rect" style={{width:props.widd}}>
        {props.name}
      </div>
    );
  }
  
  export default BtnBlue50Rect;