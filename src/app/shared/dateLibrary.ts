
export class DateLib {
    static convertTommddyyyy(dateString): string {
        /**
         * Convert yyyy-mm-dd to mm/dd/yyyy
         */
        dateString = dateString.split('-');
        dateString = dateString[1] + "/" + dateString[2]  + "-" + dateString[0];
        return dateString;
    }

    static convertToyyyymmdd(dateString): string {
        /**
         * Convert mm/dd/yyyy to yyyy-mm-dd
         */
        dateString = dateString.split(/\//);
        dateString = dateString[2] + "-" + dateString[0]  + "-" + dateString[1];
        return dateString;
    }

    private static getyyyymmdd(_date): string {
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

    static getTodayDate(): string {
        var today = new Date();
        return DateLib.getyyyymmdd(today);
    }
}