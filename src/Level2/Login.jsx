import './Login.css';
import logoPic from '../assets/logo.png'

const Login = () => {
  return (
    <div className="login-container">
      <img className="login-image" src ={logoPic} alt="logo picture"></img>
      <div className="login-form">
        <label htmlFor="username">従業員番号：</label>
        <input type="text" id="username" name="username" placeholder="従業員番号を入力" />
        
        <label htmlFor="password">パスワード：</label>
        <input type="password" id="password" name="password" placeholder="パスワードを入力" />
        
        <button type="button">ログイン</button>
      </div>
    </div>
  );
}

export default Login;