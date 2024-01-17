import { defineStore } from 'pinia'
import { api } from 'boot/axios.js'

export const useReportStore = defineStore('report', {
  state: () => ({
    report: {},
    reports: [],
    reportError: false
  }),
  getters: {
    getReport (state) { return state.report },
    getReports (state) { return state.reports },
    getReportError (state) { return state.reportError }
  },
  actions: {
    async fetchReports () {
      try {
        const reports = await api.get('reports')
        console.log('---reports', reports)
      } catch (error) {
        console.log('---fetchReports', JSON.stringify(error))
      }
    },
    async createReport (params) {
      try {
        const form = new FormData()
        for (const image of params.images) {
          const { blob, fileName } = await this.upload(image)
          form.append('files', blob, fileName)
        }
        /* const { blob, fileName } = await this.upload(params.images[0])
        form.append('files', blob, fileName) */

        await api.post('reports/create', form, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
      } catch (error) {
        console.log('---createReport', JSON.stringify(error))
      }
    },
    async upload (file) {
      try {
        console.log('-----UPLOAD')
        const response = await fetch(file.src)
        const blob = await response.blob()
        const parsedUrl = new URL(file.src)
        const pathSegments = parsedUrl.pathname.split('/')
        const fileName = pathSegments[pathSegments.length - 1]
        return { blob, fileName }
      } catch (error) {
        console.log('Ошибка загрузки файлов')
      }
    }
  }
})
