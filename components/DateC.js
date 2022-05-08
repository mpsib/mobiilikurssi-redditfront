export default function DateC (props){
    let d = new Date(props.time*1000);

    return (
        <>{d.getHours()}:{d.getMinutes()<10?'0'+d.getMinutes():d.getMinutes()}  {d.getDate()}.{d.getMonth()}.{d.getFullYear()}</>
    )
}