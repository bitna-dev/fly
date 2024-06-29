export interface Post {
  id?: string
  email: string
  title: string
  createdAt: string
  content: string
  updatedAt: string
  uid: string
  comments?: Comment[]
}

export interface Comment {
  content: string
  uid: string
  eamil: string
  createdAt: string
  updatedAt: string
}
