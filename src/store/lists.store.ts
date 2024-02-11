import { ListWithCards } from '@/types'
import {create} from 'zustand'

interface IListsStore {
	orderedData:ListWithCards[],
	setOrderedData:(data: ListWithCards[]) => void 
}

export const useListsStore = create<IListsStore>(set => ({
	orderedData:[],
	setOrderedData:(data) => set({orderedData:data})
}))