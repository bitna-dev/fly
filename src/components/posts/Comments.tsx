import { COLLECTIONS } from '@constants/index'
import { AuthContext } from '@contexts/AuthContext'
import { Post } from '@models/post'
import { store } from '@remote/firebase'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { getPosts, getSinglePost } from './hooks/usePosts'

interface CommentProps {
  post: Post
}
const Comments = ({ post }: CommentProps) => {
  const { user } = useContext(AuthContext)
  const [comment, setComment] = useState('')

  const handleChange = (e: any) => {
    setComment(e.target.value)
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      if (post && post?.id) {
        const postRef = doc(store, COLLECTIONS.POST, post.id)
        if (user?.uid) {
          const commentObj = {
            content: comment,
            uid: user.uid,
            email: user.email,
            createdAt: new Date().toLocaleDateString('ko', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            }),
            updatedAt: new Date().toLocaleDateString('ko', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            }),
          }
          await updateDoc(postRef, {
            comments: arrayUnion(commentObj),
          })
        }
        setComment('')
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <div className="comments">
        <form className="comments__form" onSubmit={handleSubmit}>
          <div className="form__block">
            <label htmlFor="comment">댓글</label>
          </div>
          <div className="comment__writer">
            <div className="comment__writer-inbox">
              <div className="comment__author">{post.email}</div>
              <textarea
                value={comment}
                id="comment"
                required
                name="comment"
                onChange={handleChange}
              />
            </div>
            <div className="comment__submit">
              <input type="submit" value="등록" />
            </div>
          </div>
        </form>
      </div>
      <div className="comments__list">
        {post?.comments
          ?.slice(0)
          .reverse()
          .map((comment) => (
            <div key={comment.updatedAt} className="comment__box">
              <div className="comment__profile-box">
                <div className="post__profile" />
                <div className="comment__email">{comment.eamil}</div>
                <div className="comment__createdAt">{comment.updatedAt}</div>
                <div className="comment__delete">삭제</div>
              </div>
              <div className="comment_text">{comment.content}</div>
            </div>
          ))}
      </div>
    </>
  )
}

export default Comments
