import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { DateTime } from 'luxon';

export const futureDateTimeErrorKey = 'notFutureDate';

export const futureDateTimeValidator: ValidatorFn = (control: AbstractControl, dateField: string = 'data', timeField: string = 'horario'): ValidationErrors | null => {
  const formGroup = control.parent
  if (!formGroup) return null

  const dateValue = formGroup.get(dateField)?.value as DateTime
  const timeValue = formGroup.get(timeField)?.value as string
  
  if (!dateValue || !timeValue) return null

  const [hours, minutes] = timeValue.split(':').map(Number)
  
  const entryValue = dateValue.set({ hour: hours, minute: minutes, second: 0, millisecond: 0 })
  const dateNow = DateTime.now()

  return entryValue < dateNow ? { [futureDateTimeErrorKey]: true } : null
};