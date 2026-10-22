import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface AuthUser {
  id: string
  fullName: string
  mobile: string
  email?: string
}

type AuthState = {
  user: AuthUser | null
  login: (mobile: string, password: string) => Promise<boolean>
  register: (data: {
    fullName: string
    mobile: string
    password: string
  }) => Promise<boolean>
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: async (mobile) => {
        await delay(400)
        set({
          user: {
            id: 'u1',
            fullName: 'کاربر گلداستور',
            mobile,
            email: 'user@goldstore.ir',
          },
        })
        return true
      },
      register: async ({ fullName, mobile }) => {
        await delay(500)
        set({
          user: {
            id: 'u1',
            fullName,
            mobile,
          },
        })
        return true
      },
      logout: () => set({ user: null }),
    }),
    { name: 'goldstore-auth' },
  ),
)

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}
