import { COLLECTIONS } from '@constants/index'
import { Post } from '@models/post'
import { store } from '@remote/firebase'
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from 'firebase/firestore'

export const getPosts = async () => {
  const postRef = collection(store, COLLECTIONS.POST)
  const postsQuery = query(postRef, orderBy('createdAt', 'desc'))
  const querySnapshot = await getDocs(postsQuery)
  const items = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Post),
  }))
  return items
}

export const getSinglePost = async (id: string) => {
  const docSnapshot = await getDoc(doc(store, COLLECTIONS.POST, id))
  console.log({ ...(docSnapshot.data() as Post) })
  return { id, ...(docSnapshot.data() as Post) }
}

export const getMyPost = async (uid: string) => {
  const postRef = collection(store, COLLECTIONS.POST)
  const postsQuery = query(
    postRef,
    where('uid', '==', uid),
    orderBy('createdAt', 'desc'),
  )
  const querySnapshot = await getDocs(postsQuery)
  const items = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Post),
  }))
  console.log('items=', items)
  return items
}
