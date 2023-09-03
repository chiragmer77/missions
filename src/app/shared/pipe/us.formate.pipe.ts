import { Pipe } from '@angular/core';


@Pipe({ name: 'USphone' })
export class PhonePipe {
    formatPhoneNumber(s: any) {

        var s2 = ("" + s).replace(/\D/g, '');
        var m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
        return (!m) ? null : "(" + m[1] + ") " + m[2] + "-" + m[3];
    }
    transform(val: any, args: any) {
        var formattedPhone: any = "";
        try {
            formattedPhone = this.formatPhoneNumber(val);

        } catch (error) {
            formattedPhone = val;
        }

        if (formattedPhone == null)
            formattedPhone = val;

        return formattedPhone;
    }
}
