import React  from "react"
import {Card} from 'antd'
import {Character} from "../../services/models";
import {useNavigate} from "react-router-dom";
import styles from './CharacterCard.module.scss'
import {EyeOutlined} from '@ant-design/icons';
import textData from '../../languages/en.json'
import {getIdByUrl} from "../../utils/utils";

interface CharacterCardProps {
    character: Character
}

const CharacterCard: React.FC<CharacterCardProps> = (props) => {
    const {character} = props

    const navigate = useNavigate()
    const onEditCharacter = (id?: string) => id && navigate(`/${id}`)

    return (
        <div className={styles.character_wrapper}>
            <Card
                size={"small"}
                title={character.name}
                extra={
                    <EyeOutlined
                        onClick={() => onEditCharacter(getIdByUrl(character.url))}
                        key="eye"
                    />
                }
            >
                <p>{textData.characterCard.yearOfBirth}: <b>{character.birth_year}</b></p>
                <p>{textData.characterCard.gender}: <b>{character.gender}</b></p>
                <p>{textData.characterCard.height}: <b>{character.height}</b></p>
            </Card>
        </div>
    )
}

export default CharacterCard