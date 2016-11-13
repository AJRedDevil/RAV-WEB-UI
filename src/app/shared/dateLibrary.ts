
export class DateLib {
    static convertToddmmyyyy(dateString): string {
        /**
         * Convert yyyy-mm-dd to mm/dd/yyyy
         */
        var _date = new Date(dateString);
        var yyyy = _date.getFullYear();
        var dd = _date.getDate().toString();
        var mm = (_date.getMonth()+1).toString();
        if(parseInt(dd) < 10){
            dd = '0' + dd;
        } 
        if(parseInt(mm)< 10){
            mm = '0' + mm;
        } 
        var newFormat = mm.toString() + "/" + dd.toString() + "/" + yyyy.toString();
        return newFormat
    }

    static convertToyyyymmdd(dateString): string {
        /**
         * Convert mm/dd/yyyy to yyyy-mm-dd
         */
        dateString = dateString.split(/\//).reverse().join('/');
        var _date = new Date(dateString);
        var yyyy = _date.getFullYear();
        var dd = _date.getDate().toString();
        var mm = (_date.getMonth()+1).toString();
        if(parseInt(dd) < 10){
            dd = '0' + dd;
        } 
        if(parseInt(mm)< 10){
            mm = '0' + mm;
        } 
        var newFormat =  yyyy.toString() + "-" + mm.toString() + "-" + dd.toString();
        return newFormat
    }
}