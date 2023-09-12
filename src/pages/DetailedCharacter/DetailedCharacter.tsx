import React, {useEffect, useState} from "react"
import {Character, Starship} from "../../services/models";
import styles from './DetailedCharacter.module.scss'
import textData from "../../languages/en.json";
import dayjs from 'dayjs';
import {useNavigate, useParams} from "react-router-dom";
import {AxiosResponse} from "axios";
import {Button, Card, Col, DatePicker, Input, notification, Row, Select} from "antd";
import {getIdByUrl} from "../../utils/utils";
import {DefaultOptionType} from "rc-select/lib/Select";
import {RestCharacters, RestStarships} from "../../api/rest";
import Loader from "../../components/Loader/Loader";

interface FieldData {
    type: "input" | "date" | "select",
    fieldLabel: string,
    fieldName: keyof Character,
    disabled: boolean
}

const DetailedCharacter = () => {

    const params = useParams()
    const navigate = useNavigate()
    const {id} = params
    const [character, setCharacter] = useState<Character | undefined>(undefined)

    const [starShipsNames, setStarShipsNames] = useState<string[]>([])
    const [starShipsOptions, setStarShipsOptions] = useState<DefaultOptionType[]>([])

    const getStarShipsOptions = async () => {
        let result: DefaultOptionType[] = []
        RestStarships.getList<Starship>().then(options => {
            result = options.data.results.map(starShip => {
                return {
                    label: starShip.name,
                    value: starShip.name
                }
            })
            setStarShipsOptions(result)
        }).catch((e) => {
            notification.error({
                message: textData.notifications.error + e
            })
        })

    }

    const getStarShipsNames = async (starShipUrls: string[]) => {
        let result: string[] = []
        let response = await Promise.all(starShipUrls.map(starShipUrl => {
            let id = getIdByUrl(starShipUrl)
            return RestStarships.getListById<Starship>(id)
        }))
        await Promise.all(response.map(item => item.data)).then((starShips: Starship[]) => {
            starShips.forEach((starShip: Starship) => {
                result.push(starShip.name)
            })
        }).catch((e) => {
            notification.error({
                message: textData.notifications.error + e
            })
        })
        setStarShipsNames(result)
    }

    const onCharacterDataChange = (field: keyof Character, value: string | string[]) => {
        setCharacter((prevState) => {
          return prevState ? {
              ...prevState,
              [field]: value
          } : undefined
        })
    }

    const fieldsData: FieldData[] = [
        { type: "input", fieldLabel: "Name", fieldName: "name", disabled: true },
        { type: "input", fieldLabel: "Gender", fieldName: "gender", disabled: false },
        { type: "input", fieldLabel: "Year of Birth", fieldName: "birth_year", disabled: false },
        { type: "date",  fieldLabel: "Created", fieldName: "created", disabled: false },
        { type: "date",  fieldLabel: "Edited", fieldName: "edited",  disabled: false },
        { type: "select", fieldLabel: "Starships", fieldName: "starships", disabled: false },
        { type: "input", fieldLabel: "Height", fieldName: "height", disabled: false },
        { type: "input", fieldLabel: "Eye Color", fieldName: "eye_color", disabled: false },
        { type: "input", fieldLabel: "Hair Color", fieldName: "hair_color", disabled: false },
    ]

    const saveBtnClickHandler = () => {
        id && character && RestCharacters.updateItemLocally<Character>(id, character).then(() => {
            navigate('/')
            notification.success({
                message: textData.notifications.saveLocally
            })
        })
    }

    const backBtnClickHandler = () => navigate(-1)

    useEffect(() => {
        id && RestCharacters.getListById<Character>(id).then(async (charactersDto: AxiosResponse<Character>) => {
            await getStarShipsNames(charactersDto.data.starships)
            await getStarShipsOptions()
            setCharacter(charactersDto.data)
        }).catch((e) => {
            notification.error({
                message: textData.notifications.error + e
            })
            navigate('/')
        })
    },[id, navigate])

    return (
        character ?
            <div className={styles.detailedCharacter_wrapper}>
                <div className={styles.detailedCharacter_buttonsWrapper}>
                    <Button type="default" className={styles.action_button} onClick={backBtnClickHandler}>
                        {textData.buttons.back}
                    </Button>
                    <Button type="primary" className={styles.action_button} onClick={saveBtnClickHandler}>
                        {textData.buttons.save}
                    </Button>
                </div>
                <Card title={`Details for ${character.name}`}>
                <Row gutter={8}>
                {
                    fieldsData.map((fieldData) => {
                        return (
                        <Col sm={12} span={24} >
                            <div className={styles.detailedCharacter_item}>
                                <p>{fieldData.fieldLabel}:</p>
                                { fieldData.type === "input" ?
                                    <Input
                                        value = {character[fieldData.fieldName] as string}
                                        onChange = {(e) => onCharacterDataChange(fieldData.fieldName, e.target.value)}
                                        disabled={fieldData.disabled}
                                    /> : fieldData.type === "date" ?
                                    <DatePicker
                                        value = {dayjs(character[fieldData.fieldName] as string)}
                                        onChange = {date => date && onCharacterDataChange(fieldData.fieldName, date.toISOString())}
                                        disabled={fieldData.disabled}
                                    /> :
                                    <Select
                                        mode={"multiple"}
                                        disabled={fieldData.disabled}
                                        value={starShipsNames}
                                        onChange={value => setStarShipsNames(value)}
                                        options={starShipsOptions}
                                    />
                                }
                            </div>
                        </Col>
                        )
                    })
                }
                </Row>
                </Card>
            </div> :
            <Loader/>
    )
}

export default DetailedCharacter