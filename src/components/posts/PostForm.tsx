import { COLLECTIONS } from '@constants/index'
import { AuthContext } from '@contexts/AuthContext'
import { Post } from '@models/post'
import { store } from '@remote/firebase'
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getSinglePost } from './hooks/usePosts'

type PostForm = {
  title: string
  content: string
}
const PostForm = () => {
  const navigate = useNavigate()
  const { id } = useParams() as { id: string }
  console.log('id in form', id)

  const [values, setValues] = useState<PostForm>({
    title: '',
    content: '',
  })

  const { user } = useContext(AuthContext)

  //새로운 글 쓰기 일 경우
  const handleChange = (e: any) => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value,
    })
  }
  const handleSubmit = async (e: any) => {
    e.preventDefault()

    if (id) {
      try {
        const postRef = await updateDoc(doc(store, COLLECTIONS.POST, id), {
          title: values.title,
          content: values.content,
          updatedAt: new Date().toLocaleDateString('ko', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }),
        })
        navigate('/')
        toast.success('게시글이 수정되었습니다.')
      } catch (error: any) {
        console.log(error)
        toast.error(error.code)
      }
    } else {
      try {
        const docRef = await addDoc(collection(store, COLLECTIONS.POST), {
          title: values.title,
          content: values.content,
          createdAt: new Date().toLocaleDateString('ko', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }),
          email: user?.email,
          uid: user?.uid,
        })
        navigate('/')
        toast.success('게시글이 등록되었습니다.')
      } catch (error: any) {
        console.log(error)
        toast.error(error.code)
      }
    }
  }
  // 수정일 경우
  useEffect(() => {
    if (id) {
      getSinglePost(id).then((item) => {
        setValues({
          title: item.title,
          content: item.content,
        })
      })
    }
  }, [])

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form__block">
        <label htmlFor="title">제목</label>
        <input
          className="input"
          id="title"
          required
          name="title"
          value={values.title}
          onChange={handleChange}
        />
      </div>
      <div className="form__block">
        <label htmlFor="title">내용</label>
        <textarea
          className="textarea"
          id="content"
          required
          name="content"
          value={values.content}
          onChange={handleChange}
        />
      </div>
      <div className="form__block">
        <input
          className="form__btn--submit"
          type="submit"
          value={id ? '수정' : '제출'}
        />
      </div>
    </form>
  )
}

export default PostForm
