import Head from 'next/head'

const Meta = (props) => (
  <Head>
    <title>{props.title ? props.title : 'HK Inovasi Untuk Solusi'}</title>
    <link rel='icon' href='/logo.jpg' />
  </Head>
)

export default Meta