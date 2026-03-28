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
        
        // 기존 13번 줄을 지우고 아래 내용으로 바꾸세요
          <p>김온유 학생의 포트폴리오입니다 :)</p>
        <div className="explanation">
          <p>노션으로 만드는 나만의 블로그입니다.</p>
        </div>
      </div>
    </>
  )
}
