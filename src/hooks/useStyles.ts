import { createStyles } from 'antd-style'

const useStyles = createStyles(({ css }) => ({
  container: css`
    min-height: 100vh;
    padding-left: 6.25rem;
    padding-right: 6.25rem;

    @media only screen and (max-width: 768px) {
      padding-left: 3.125rem;
      padding-right: 3.125rem;
    }

    @media only screen and (max-width: 480px) {
      padding-left: 0.625rem;
      padding-right: 0.625rem;
    }
  `,

  center: css`
    height: 100vh;
    justify-content: center;
    margin: 0 auto;
    padding: 0 !important;
  `,

  headerCenter: css`
    background: inherit;
    height: auto;
    margin: auto;
    padding-inline: 0;
    line-height: 0;
  `,

  header: css`
    background: inherit;
    height: auto;
    margin: 0;
    padding-inline: 0;
    line-height: 0;
    padding-top: 1rem;
  `,

  alert: css`
    margin-top: 1rem;
  `,

  title: css`
    margin-bottom: 0 !important;
    margin-block-start: 0 !important;
  `,

  centerText: css`
    text-align: center;
  `,

  notFoundTitle: css`
    font-size: 10rem !important;
    margin-bottom: 0 !important;

    @media only screen and (max-width: 480px) {
      font-size: 5rem !important;
    }
  `,

  notFoundText: css`
    font-size: 1.2rem !important;
  `,
}))

export default useStyles
