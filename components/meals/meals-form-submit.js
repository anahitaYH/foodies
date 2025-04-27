'use client'

import { useFormStatus } from "react-dom";

export default function MealsFormSubmit(){

const status = useFormStatus()
const {pending} = status

return(
    <button disabled={pending}>{pending? 'Submitting...' : 'Share Meal'}</button>
)
}