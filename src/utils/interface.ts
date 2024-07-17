export interface UserProps {
    id?: number
    email: string
    fullname: string
    imgUrl: string
    createdAt?: string
    updatedAt?: string
    faculty: string
    // TODO: remove optional for batch attribute
    batch?: string 
    is_admin: boolean
}

