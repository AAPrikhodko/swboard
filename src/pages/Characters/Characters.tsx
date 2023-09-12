import React, {useEffect, useState} from "react"
import {Character, Dto} from "../../services/models";
import styles from './Characters.module.scss'
import textData from '../../languages/en.json'
import {AxiosResponse} from "axios";
import {RestCharacters} from "../../api/rest";
import Search from "antd/es/input/Search";
import {List, notification} from "antd";
import CharacterCard from "../../components/CharacterCard/CharacterCard";
import Loader from "../../components/Loader/Loader";
import {useNavigate} from "react-router-dom";

const Characters = () => {
    const [characters, setCharacters] = useState<Character[]>([])
    const [totalItems,setTotalItems] = useState<number>(0)
    const [page,setPage] = useState<number>(1)
    const [term, setTerm] = useState<string>('')
    const [isPageLoaded, setIsPageLoaded] = useState(false)
    const [isSearchLoaded, setIsSearchLoaded] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        RestCharacters.getList<Character>(page, term).then((charactersDto:AxiosResponse<Dto<Character>>) => {
            setCharacters(charactersDto.data.results)
            setTotalItems(charactersDto.data.count)
            setIsPageLoaded(true)
            setIsSearchLoaded(true)
        }).catch((e) => {
            notification.error({
                message: textData.notifications.error + e
            })
            navigate('/')
        })
    },[navigate, page, term])

    return (
        <div className={styles.characters_wrapper}>
            {
                isPageLoaded
                    ? <>
                        <div className={styles.characters_title}>{textData.characters.title}</div>
                        <Search
                            className={styles.characters_searchBar}
                            placeholder={textData.characters.searchPlaceholder}
                            enterButton={textData.buttons.search}
                            size="large"
                            disabled={!isPageLoaded}
                            loading={!isSearchLoaded}
                            onSearch={(value) => {
                                setIsSearchLoaded(false)
                                setTerm(value)
                                !value && setPage(1)
                            }}
                        />
                        <List
                            className={styles.characters_list}
                            grid={{ gutter: 25, column: 1, md: 2, lg:3, xl: 4, xxl: 4}}
                            dataSource={characters}
                            renderItem={item => (
                                <List.Item>
                                    <CharacterCard character={item}/>
                                </List.Item>
                            )}
                            pagination={{
                                align: "center",
                                showSizeChanger: false,
                                current: page,
                                total: totalItems,
                                onChange: (page) => {
                                    setIsPageLoaded(false)
                                    setPage(page)
                                }
                            }}
                           />
                    </>
                    : <Loader />
            }
        </div>
    )
}

export default Characters