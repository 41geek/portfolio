import Header from '../components/header'
import sharedStyles from '../styles/shared.module.css'

export default function Index() {
  return (
    <>
      <Header titlePre="Home" />
      <div className={sharedStyles.layout}>
        {/* 제목만 남기고 다 지웠습니다 */}
        <h1>Onyu Kim portfolio</h1>
        <h2>Welcome to my portfolio!</h2> 

        <div className="explanation">
          <p>노션으로 만드는 나만의 블로그입니다.</p>
        </div>
      </div>
    </>
  )
}
