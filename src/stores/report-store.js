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
        const response = await fetch(params.images[0].src)
        const blob = await response.blob()
        const form = new FormData()
        form.append('files', blob)
        await api.post('reports/create', form, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
      } catch (error) {
        console.log('---createReport', JSON.stringify(error))
      }
    }
  }
})
