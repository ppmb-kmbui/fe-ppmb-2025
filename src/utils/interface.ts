interface Idk {
    to: UserProps
}

export interface UserProps {
    id: number
    email: string
    fullname: string
    imgUrl: string
    createdAt?: string
    updatedAt?: string
    faculty: string
    batch: number 
    isAdmin: boolean
    followers: number
    networking_tasks: Idk[]
}

export interface FriendProps extends UserProps {
    status: "not_connected" | "meminta_konfirmasi" | "menunggu_konfirmasi" | "accepted" | "sedang_networking" | "done"
}
