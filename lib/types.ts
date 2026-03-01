export type Difficulty= 'Beginner' | 'Intermediate'|'Advanced'

export type Category= 'DeFi'|'NFTs'|'Gaming' |'Infra'|'DAO'|'DevTools'

export type Resource={
    id : string
    icon ?: string
    title : string
    description : string
    category : Category
    difficulty : Difficulty
    tags : string[]
    url : string
    featured :  boolean
    dateAdded: string
}