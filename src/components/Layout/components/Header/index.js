import classNames from "classnames/bind"
import styles from "./Header.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark,faMagnifyingGlass,faSpinner } from "@fortawesome/free-solid-svg-icons"

import logoTikTok from '~/assets/images/logotiktok.jpg';



const cx = classNames.bind(styles)

function Header() {
  return <header className={cx("wrapper")}>
    <div className={cx("inner")}>
    <img src={logoTikTok} alt="Tiktok" width={150}></img>
      <div className={cx("search")}>
        <input placeholder="Search Account and videos" spellCheck={false} />
        <button className={cx("clear")}>
          <FontAwesomeIcon icon={faCircleXmark} />
        </button>
        <FontAwesomeIcon className={cx("loading")} icon={faSpinner} />
        
        <button className={cx("search-btn")}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />

        </button>
      </div>

      <div className={cx("actions")}>

      </div>
    </div>
  </header>
}

export default Header
