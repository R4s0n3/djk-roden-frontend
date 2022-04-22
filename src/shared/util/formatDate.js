const formatDate = (date) => {
    const oldDate = date;
    const Day = oldDate.slice(8,10)
    const Month = oldDate.slice(5,7)
    const Year = oldDate.slice(0,4)
    return(
    `${Day}.${Month}.${Year}`
    );

}