import React, {useEffect, useState} from 'react'

export function setForm(form,_key,_value){
    _setForm({...form, [_key]: _value});
}

export function clearForm(data){

}