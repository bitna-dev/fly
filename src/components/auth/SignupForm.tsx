import { auth } from '@remote/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

interface SignupValues {
  email: string
  password: string
  c_password: string
}
const SignupForm = () => {
  const navigate = useNavigate()
  const [values, setValues] = useState<SignupValues>({
    email: '',
    password: '',
    c_password: '',
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
      createUserWithEmailAndPassword(auth, values.email, values.password).then(
        (user) => {
          console.log(user)
        },
      )
      toast.success('환영합니다.')
      navigate('/')
    } catch (error) {
      console.log(error)
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
          <label>비밀번호확인</label>
          <input
            required
            type="password"
            name="c_password"
            className="input"
            placeholder="재확인 비밀번호를 입력해주세요."
            value={values.c_password}
            onChange={handleChange}
          />
        </div>
        <div className="login__block">
          <Link to="/login" className="link__auth">
            이미 계정이 있으신가요?
          </Link>
        </div>
        <div className="login__block">
          <button className="btn--submit" type="button" onClick={handleSubmit}>
            회원가입
          </button>
        </div>
      </div>
    </div>
  )
}

export default SignupForm
