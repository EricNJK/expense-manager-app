export default function FormattedDate(props) {
    function format(date) {
        let months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        let dt_obj = new Date(date);
        return days[dt_obj.getDay()] + " " +
            months[dt_obj.getMonth()] + "-" +
            dt_obj.getDate() + "-" + dt_obj.getFullYear();
    }

    return (<span>{format(props.value)}</span >)
}
