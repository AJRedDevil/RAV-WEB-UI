import { FormControl } from '@angular/forms';

export class DateValidators {
    static shouldHaveDateFormat(control: FormControl) {
        return new Promise((resolve, reject) => {
            let requiredDatePattern = /^\d{4}-\d{1,2}-\d{1,2}$/;
            if (control.value && !control.value.match(requiredDatePattern)) {
                resolve({ shouldHaveDateFormat: true });
            } else {
                resolve(null);
            }
        });
    }
}