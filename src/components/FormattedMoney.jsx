export default function FormattedMoney(props) {
    return (
        <span>{parseFloat(props.value).toFixed(2)}</span>
    )
}
