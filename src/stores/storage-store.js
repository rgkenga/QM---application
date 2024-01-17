import { defineStore } from 'pinia'
import { Preferences } from '@capacitor/preferences'

export const useStorageStore = defineStore('storage', {
  state: () => ({
    step: 1,
    points: [],
    images: [],
    idGeo: ''
  }),
  getters: {
    getStep (state) { return state.step },
    getPoints (state) { return state.points },
    getImages (state) { return state.images },
    getIdGeo (state) { return state.idGeo }
  },
  actions: {
    async getStorageStep () {
      const { value } = await Preferences.get({ key: 'step' })
      if (!value) {
        this.step = 1
      } else {
        this.step = JSON.parse(value)
      }
    },
    async getStoregPoints () {
      const { value } = await Preferences.get({ key: 'points' })
      if (!value) {
        this.points = []
      } else {
        this.points = JSON.parse(value)
      }
    },
    async getStoregImages () {
      const { value } = await Preferences.get({ key: 'images' })
      if (!value) {
        this.images = []
      } else {
        this.images = JSON.parse(value)
      }
    },
    async setStorageStep (value) {
      await Preferences.set({
        key: 'step',
        value: JSON.stringify(value)
      })
    },
    async setStoragePoints (value) {
      await Preferences.set({
        key: 'points',
        value: JSON.stringify(value)
      })
    },
    async setStorageImages (value) {
      await Preferences.set({
        key: 'images',
        value: JSON.stringify(value)
      })
    },
    async removeStorage () {
      await Preferences.clear({ key: 'step' })
      this.step = 1
      await Preferences.clear({ key: 'points' })
      this.points = []
      await Preferences.clear({ key: 'images' })
      this.images = []
    }
  }
})
