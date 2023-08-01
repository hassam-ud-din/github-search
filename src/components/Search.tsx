import { Row, Space, Col, Typography } from "antd"
import React from "react"
import { MIN_SEARCH_LENGTH } from "../shared/constants"
import CustomSwitch from "./common/CustomSwitch"
import InputField from "./common/InputField"
import Dropdown from "./common/Dropdown"
import CustomLogo from "./common/CustomLogo"
import { Category } from "../shared/types"

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
  return (
    <Space
      direction="vertical"
      className={`width400 ${searchTerm.length < MIN_SEARCH_LENGTH ? "center" : ""}`}
    >
      <Row gutter={[16, 16]} align={"middle"}>
        <Col>
          <CustomLogo />
        </Col>
        <Col flex="auto">
          <Title level={4} style={{ marginBottom: "0", marginBlockStart: "0" }}>
            Github Searcher
          </Title>
          <Text type="secondary">Search users or repositories below</Text>
        </Col>
        <Col>
          <CustomSwitch />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col flex="auto">
          <InputField searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
        </Col>
        <Col>
          <Dropdown
            selectedCategory={selectedCategory}
            categories={categories}
            handleCategoryChange={handleCategoryChange}
          />
        </Col>
      </Row>
    </Space>
  )
}

export default Search
