import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { getSinglePost } from './hooks/usePosts'
import { Post } from '@models/post'
import { AuthContext } from '@contexts/AuthContext'
import Loader from '@components/Loader'
import { deleteDoc, doc } from 'firebase/firestore'
import { store } from '@remote/firebase'
import { COLLECTIONS } from '@constants/index'
import { toast } from 'react-toastify'
import Comments from './Comments'

const PostDetail = () => {
  const { id } = useParams() as { id: string }
  const navigate = useNavigate()
  const [post, setPost] = useState<Post | null>(null)
  const { user } = useContext(AuthContext)

  const handleDelete = async () => {
    const confirm = window.confirm('삭제하시겠습니까?')
    if (confirm && id) {
      try {
        await deleteDoc(doc(store, COLLECTIONS.POST, id))
        navigate('/')
        toast.success('삭제되었습니다.')
      } catch (error: any) {
        console.log(error)
        toast.error(error.code)
      }
    }
  }
  useEffect(() => {
    if (id) {
      getSinglePost(id).then((item) => {
        setPost(item)
      })
    }
  }, [id])
  return (
    <>
      {post ? (
        <div className="post__detail">
          <div className="post__box">
            <div className="post__title">{post?.title}</div>

            <div className="post__profile-box">
              <div className="post__profile" />
              <div className="post__author-name">{post?.email}</div>
              <div className="post__date">{post?.createdAt}</div>
            </div>
            <div className="post__content post__text--pre-wrap">
              {post?.content}
            </div>

            {user?.email === post.email && (
              <div className="post__utils-box">
                <div className="post__delete">
                  <span onClick={handleDelete}>삭제</span>
                </div>
                <div className="post__edit">
                  <Link to={`/posts/edit/${id}`}>수정</Link>
                </div>
              </div>
            )}
          </div>
          <Comments post={post} />
        </div>
      ) : (
        <Loader />
      )}
    </>
  )
}

export default PostDetail
