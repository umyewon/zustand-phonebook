import { create } from 'zustand';
import {devtools } from 'zustand/middleware'

const usePhoneBookStore = create (devtools((set, get) => ({
    phoneBook : [{id : 1748416682298, name : '홍길동', phoneNum : '010-1234-5678', profile : 'data:image/png;base64,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' }],
    searchBook : null,

    addContact : (profile, name, phoneNum) => set((state) => ({ 
        phoneBook : [...state.phoneBook, {id:Date.now(), profile, name, phoneNum}] // 기존의 phoneBook은 유지한채로 새로운 연락처 추가
    })),
    serachBy : (searchKeyword) => {        
        if(searchKeyword == '' || searchKeyword == null || !searchKeyword) {
            set((state) => ({
                phoneBook : [...state.phoneBook],
                searchBook : null,  // 다시 리셋
            }))
            return;
        }

        set((state) => ({
            searchBook :  [...state.phoneBook].filter((item) => {
                return item.name.match(searchKeyword);
            })
        }))

    },

})));

export default usePhoneBookStore;