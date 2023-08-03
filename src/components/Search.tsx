import { Row, Space, Col, Typography } from "antd"
import React from "react"
import { MIN_SEARCH_LENGTH } from "../shared/constants"
import CustomSwitch from "./common/CustomSwitch"
import InputField from "./common/InputField"
import Dropdown from "./common/Dropdown"
import CustomLogo from "./common/CustomLogo"
import GithubLogoBlack from "../assets/images/github-mark.svg"
import GithubLogoWhite from "../assets/images/github-mark-white.svg"
import { Category } from "../shared/types"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { toggleTheme } from "../features/themeSlice"
import useStyles from "../hooks/useStyles"

type Props = {
  searchTerm: string
  categories: Array<Category>
  selectedCategory: string
  handleCategoryChange: (newCategory: string) => void
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const { Title, Text } = Typography

function Search({
  searchTerm,
  categories,
  selectedCategory,
  handleCategoryChange,
  handleSearchChange,
}: Props) {
  const dispatch = useAppDispatch()
  const darkMode = useAppSelector((state) => state.theme.darkMode)

  const handleToggleTheme = () => {
    dispatch(toggleTheme())
  }

  const { styles } = useStyles()
  return (
    <Space
      direction="vertical"
      className={`${searchTerm.length < MIN_SEARCH_LENGTH && styles.center}`}
    >
      <Row gutter={[16, 16]} align={"middle"}>
        <Col>
          <CustomLogo
            DarkModeLogo={GithubLogoWhite}
            LightModeLogo={GithubLogoBlack}
            size={48}
          />
        </Col>
        <Col flex="auto">
          <Title level={4} className={styles.title}>
            Github Searcher
          </Title>
          <Text type="secondary">Search users or repositories below</Text>
        </Col>
        <Col>
          <CustomSwitch
            id={"darkToggleTheme"}
            checkedChildren={"Dark"}
            unCheckedChildren={"Light"}
            checked={darkMode}
            handleChange={handleToggleTheme}
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col flex="auto">
          <InputField
            type={"text"}
            name={"search"}
            placeholder={"Start typing to search..."}
            value={searchTerm}
            handleValueChange={handleSearchChange}
          />
        </Col>
        <Col>
          <Dropdown
            selected={selectedCategory}
            options={categories}
            handleOptionChange={handleCategoryChange}
            width={"6.25rem"}
          />
        </Col>
      </Row>
    </Space>
  )
}

export default Search
