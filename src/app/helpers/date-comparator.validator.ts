import { FormGroup } from '@angular/forms';

// custom validator to check that two fields match
export function DateComparator(startDate: string, endDate: string) {
    return (formGroup: FormGroup) => {
        const startDate1 = formGroup.controls[startDate];
        const endDate1 = formGroup.controls[endDate];

        if (endDate1.errors && !endDate1.errors.mustMatch) {
            return;
        }

        //     // return if another validator has already found an error on the matchingControl
        //     return;
        // }

        if (new Date(startDate1.value) > new Date(endDate1.value)) {
            endDate1.setErrors({ mustMatch: true });
        } else {
            endDate1.setErrors(null);
        }

        // set error on matchingControl if validation fails

    };
}
