import {faker} from '@faker-js/faker';
import {useEffect} from 'react';
import {GenButton} from './GenButton';
import {Clipboard} from './Clipboard';
import {EMAIL_PREFIX, EMAIL_SUFFIX} from '../constants/SettingsConstants';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {modifyEmail, modifyEmailPrefix, modifyEmailSuffix, modifyFirstname, modifyLastname} from './PersonSlice';
import {get} from "tauri-settings";
import {SettingsSchema} from "../Settings";
import {CenteredBackground} from "../components/CenteredBackground";
import {Input} from "../components/Input";

export const Person = () => {
    const dispatch = useAppDispatch()
    const firstname = useAppSelector(state => state.personReducer.firstname)
    const lastname = useAppSelector(state => state.personReducer.lastname)
    const email = useAppSelector(state => state.personReducer.email)
    const emailPrefix = useAppSelector(state => state.personReducer.emailPrefix)
    const emailSuffix = useAppSelector(state => state.personReducer.emailSuffix)

    useEffect(() => {
        get<SettingsSchema>(EMAIL_PREFIX)
            .then(e => dispatch(modifyEmailPrefix(e)))

        get<SettingsSchema>(EMAIL_SUFFIX)
            .then(e => dispatch(modifyEmailSuffix(e)))

    }, [])

    useEffect(() => {
        if (firstname.length > 0 || lastname.length > 0) {
            dispatch(modifyEmail(emailPrefix + "+" + firstname + lastname + "@" + emailSuffix))
        }
    }, [firstname, lastname])

    return <CenteredBackground>
        <h1 className='text-3xl text-white text-center'>Person generieren</h1>
        <div className="grid grid-cols-[1fr_1fr_auto] gap-4">
            <div>
                Vorname
            </div>
            <Input disabled={true} value={firstname}/>
            <div>
                <GenButton func={() => dispatch(modifyFirstname((faker.name.firstName())))} classNames={'col-1 ms-2'}/>
                <Clipboard thingToClip={firstname} classNames={'col-1 ms-2'}/>
            </div>
            <div className='col-2'>
                Nachname
            </div>
            <Input className='col-7' disabled={true} value={lastname}/>
            <div>
                <GenButton func={() => dispatch(modifyLastname((faker.name.lastName())))} classNames={'col-1 ms-2'}/>
                <Clipboard thingToClip={lastname} classNames={'col-1 ms-2'}/>
            </div>
            <div className='col-2'>
                E-Mail
            </div>
            <Input className='col-7' disabled={true} value={email}/>
            <Clipboard thingToClip={email} classNames={'col-1 ms-2'}/>
            <div className='col-2'>
                Zweifaktor-Email
            </div>
            <Input className='col-7' disabled={true} value={emailPrefix + "@" + emailSuffix}/>
            <Clipboard thingToClip={emailPrefix + "@" + emailSuffix} classNames={'col-1 ms-2'}/>
    </div>
</CenteredBackground>
}
