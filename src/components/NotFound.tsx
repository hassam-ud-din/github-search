import { Layout, Typography, Space } from "antd"
import { Link } from "react-router-dom"
import useStyles from "../hooks/useStyles"

const { Text, Title } = Typography

function NotFound() {
  const { styles } = useStyles()
  return (
    <Layout className={styles.container}>
      <Space className={styles.centerText + " " + styles.center} direction="vertical">
        <Title type="danger" className={styles.notFoundTitle}>
          404
        </Title>
        <Text className={styles.notFoundText}>Page not found</Text>
        <Link to="/">Go to App</Link>
      </Space>
    </Layout>
  )
}

export default NotFound
