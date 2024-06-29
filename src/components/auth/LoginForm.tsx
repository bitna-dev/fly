import { AuthContext } from '@contexts/AuthContext'
import { auth } from '@remote/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

interface LoginValues {
  email: string
  password: string
}
const LoginForm = () => {
  const navigate = useNavigate()
  const [values, setValues] = useState<LoginValues>({
    email: '',
    password: '',
  })

  const handleChange = (e: any) => {
    const { name, value } = e.target
    console.log({ name: value })
    setValues({
      ...values,
      [name]: value,
    })
  }
  const handleSubmit = () => {
    try {
      signInWithEmailAndPassword(auth, values.email, values.password).then(
        (user) => {
          console.log(user)
        },
      )
      toast.success('로그인되었습니다.')
      navigate('/')
    } catch (error) {
      toast.error('입력하신 정보가 존재하지 않습니다.')
      navigate('/')
    }
  }
  return (
    <div className="login">
      <div className="login__logo">FLY</div>
      <div className="login__box">
        <div className="login__block">
          <label>아이디</label>
          <input
            type="text"
            name="email"
            className="input"
            required
            placeholder="이메일을 입력해주세요."
            value={values.email}
            onChange={handleChange}
          />
        </div>
        <div className="login__block">
          <label>비밀번호</label>
          <input
            required
            type="password"
            name="password"
            className="input"
            placeholder="비밀번호를 입력해주세요."
            value={values.password}
            onChange={handleChange}
          />
        </div>
        <div className="login__block">
          <Link to="/signup" className="link__auth">
            아직 계정이 없으신가요?
          </Link>
        </div>
        <div className="login__block">
          <button className="btn--submit" type="button" onClick={handleSubmit}>
            로그인
          </button>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
