import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore'
import { getMyPost, getPosts } from './hooks/usePosts'
import { Post } from '@models/post'
import { AuthContext } from '@contexts/AuthContext'
import { store } from '@remote/firebase'
import { COLLECTIONS } from '@constants/index'
import { toast } from 'react-toastify'

interface PostListProps {
  hasNavigation?: boolean
  defaultTap: string
}
type TabType = 'all' | 'my'
const Postbox = ({
  hasNavigation = false,
  defaultTap = 'all',
}: PostListProps) => {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)
  const [isActive, setIsActive] = useState<TabType>('all')
  const [data, setData] = useState<null | Post[]>(null)

  const handleDelete = async (id: string) => {
    const confirm = window.confirm('삭제하시겠습니까?')
    if (confirm && id) {
      try {
        await deleteDoc(doc(store, COLLECTIONS.POST, id))
        getPosts().then((data) => setData(data))
        toast.success('삭제되었습니다.')
      } catch (error: any) {
        console.log(error)
        toast.error(error.code)
      }
    }
  }

  const handleMyPost = async () => {
    setIsActive('my')
    getMyPost(user?.uid as string).then((data) => {
      setData(data)
    })
  }
  const handleAllPost = async () => {
    setIsActive('all')
    getPosts().then((data) => {
      setData(data)
    })
  }
  useEffect(() => {
    if (defaultTap === 'all') {
      getPosts().then((data) => {
        setData(data)
      })
    } else {
      getMyPost(user?.uid as string).then((data) => {
        setData(data)
      })
    }
  }, [getPosts, defaultTap])
  return (
    <>
      {hasNavigation && (
        <div className="post__navigation">
          <div
            role="presentation"
            className={isActive === 'all' ? 'post__navigation--active' : ''}
            onClick={handleAllPost}
          >
            전체
          </div>
          <div
            role="presentation"
            className={isActive === 'my' ? 'post__navigation--active' : ''}
            onClick={handleMyPost}
          >
            나의글
          </div>
        </div>
      )}

      <div className="post__list">
        {data !== null ? (
          data?.map((item) => (
            <div key={item.id} className="post__box">
              <Link to={`/posts/${item.id}`}>
                <div className="post__profile-box">
                  <div className="post__profile" />
                  <div className="post__author-name">{item.email}</div>
                  <div className="post__date">
                    {item.updatedAt ? item.updatedAt : item.createdAt}
                  </div>
                </div>
                <div className="post__title">{item.title}</div>
                <div className="post__content">{item.content}</div>
              </Link>
              {user?.email === item.email && (
                <div className="post__utils-box">
                  <div className="post__delete">
                    <span
                      onClick={() => {
                        handleDelete(item.id as string)
                      }}
                    >
                      삭제
                    </span>
                  </div>
                  <div className="post__edit">
                    <Link to={`/posts/edit/${item.id}`}>수정</Link>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="post__no-post">게시글이 없습니다.</div>
        )}
      </div>
    </>
  )
}

export default Postbox
