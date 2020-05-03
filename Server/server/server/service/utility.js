// To get the age of the patient using DOB
exports.getAge = async function (bDate) { 
    var dateString = bDate.split('-');
    var dob = new Date(parseInt(dateString[2]), dateString[1], dateString[0] )
    var newDate = new Date();
    var age = newDate.getFullYear() - dob.getFullYear();
    var m = newDate.getUTCMonth() - dob.getUTCMonth();
    var d = newDate.getDate() < dob.getDate();
    
    if (m < 0 || (m === 0 && newDate.getDate() < dob.getDate())) {
        age--;
    }
    return age;     
}
 