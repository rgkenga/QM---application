<template>
  <q-page class="flex-center">
    <div><q-btn label="Clear Storage" @click="onRemoveStorage"/></div>
    <div>STEP ---- {{ step }}</div>
    <div>IDGEO ---- {{ idGeo }}</div>
    <div>POINTS ---- {{ points }}</div>
    <div>IMAGES ---- {{ images }}</div>
    <div class="row q-col-gutter-md">
      <div class="col-4" v-for="(image, index) in images" :key="index">
        <img width="50px" :src="image.src">
        <div style="font-size: 10px">
          Гео картинки - {{ image.data }}
        </div>
        <div style="font-size: 10px">
          Гео картинки - {{ image.path }}
        </div>
      </div>
    </div>
    <section class="start-monitor" v-if="step === 1">
      <div class="content">
        <p class="text-center">Внимание! Приложение в тестовом режиме, перед использованием убедитесь, что телефон подключен к интернету и включена функция местоположение(геолокация)</p>
        <p class="text-center">Принимайте все запросы на разрешения использования сервиса</p>
      </div>
      <q-btn
        unelevated round
        color="green-6"
        icon="play_arrow"
        @click="startMonitor()"
        size="50px"
      />
    </section>
    <section class="monitor" v-if="step === 2">
      <div class="content">
        Список фото
        <br>
        <!-- <div class="row q-col-gutter-md">
          <div class="col-4" v-for="(image, index) in images" :key="index">
            <img :src="image.src">
            <div style="font-size: 10px">
              Гео картинки - {{ image.data }}
            </div>
          </div>
        </div> -->
        <br>
      </div>
      <div class="bottom-bar">
        <q-btn
          unelevated no-caps
          color="blue-6"
          label="Камера"
          @click="captureImage"
          icon="photo_camera"
        />
        <q-btn
          unelevated no-caps
          color="red-6"
          label="Закончить проверку"
          @click="endMonitor()"
        />
      </div>
    </section>
    <section v-if="step === 3">
      <div class="content">
        <!-- <q-form>
          <div class="q-pa-md">
            Качество проверки
            <q-btn-toggle
              unelevated square no-caps
              v-model="model"
              toggle-color="primary"
              :options="[
                {label: 'Плохо', value: 'one'},
                {label: 'Хорошо', value: 'two'},
                {label: 'Отлично', value: 'three'}
              ]"
            />
          </div>
          <div class="q-pa-md">
            Описание
            <q-input
              v-model="text"
              filled
              type="textarea"
            />
          </div>
        </q-form> -->
      </div>
      <div class="bottom-bar">
        <q-btn
          unelevated square no-caps
          color="green-6"
          label="Отправить отчёт"
          @click="onCreateReport"
        />
      </div>
    </section>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted, computed, watch } from 'vue'
import { Camera, CameraResultType } from '@capacitor/camera'
import { registerPlugin } from '@capacitor/core'
/* import { LocationAccuracy } from '@ionic-native/location-accuracy' */
/* import { LocationAccuracy } from '@ionic-native/location-accuracy' */
/* import { Camera, CameraResultType } from '@capacitor/camera'
import { registerPlugin } from '@capacitor/core' */
import { useReportStore } from 'src/stores/report-store'
import { useStorageStore } from 'src/stores/storage-store'

const BackgroundGeolocation = registerPlugin('BackgroundGeolocation')

export default defineComponent({
  name: 'IndexPage',
  setup () {
    const storageStore = useStorageStore()
    const reportStore = useReportStore()
    const modelReport = ref({
      points: [],
      user_id: 1,
      status: 'Bad',
      description: 'Какое то описание',
      published: true,
      check: true
    })
    const step = ref(1)
    const images = ref([])
    const points = ref([])
    const idGeo = ref('')
    /* const lastLocation = ref() */

    const getStep = computed(() => {
      return storageStore.getStep
    })

    const getImages = computed(() => {
      return storageStore.getImages
    })

    const getPoints = computed(() => {
      return storageStore.getPoints
    })

    const g1 = ref()
    const g2 = ref()
    const l1 = ref([])
    const l2 = ref([])

    const geo1 = async () => {
      await startBackgroundGeolocation((callbackId1) => {
        g1.value = callbackId1
      }, l1)
    }

    const geo2 = async () => {
      await startBackgroundGeolocation((callbackId2) => {
        g2.value = callbackId2
      }, l2)
      console.log('---GEOID', g2.value)
    }

    const onRemoveG1 = async () => {
      await removeGeo(g1, l1)
    }

    const onRemoveG2 = async () => {
      await removeGeo(g2, l2)
    }

    const removeGeo = async (id, location) => {
      await BackgroundGeolocation.removeWatcher({ id: id.value })
      id.value = ''
      location.value = []
    }

    /* const getPoints = computed(() => {
      return storageStore.getPoints
    })

    const getImages = computed(() => {
      return storageStore.getImages
    }) */

    const getStorageStep = async () => {
      return storageStore.getStorageStep()
    }

    const getStorageImages = async () => {
      return storageStore.getStoregImages()
    }

    const getStoragePoints = async () => {
      return storageStore.getStoregPoints()
    }

    /* const getStoragePoints = async () => {
      return storageStore.getStoregPoints()
    }

    const getStorageImages = async () => {
      return storageStore.getStoregImages()
    } */

    const setStorageStep = async (value) => {
      return storageStore.setStorageStep(value)
    }

    const setStorageImages = async (value) => {
      return storageStore.setStorageImages(value)
    }

    const setStoragePoints = async (value) => {
      return storageStore.setStoragePoints(value)
    }

    /* const setStorageImages = async (value) => {
      return storageStore.setStorageImages(value)
    }

    const setStoragePoints = async (value) => {
      return storageStore.setStoragePoints(value)
    } */

    const removeStorage = async () => {
      return storageStore.removeStorage()
    }

    const createReport = async (params) => {
      return await reportStore.createReport(params)
    }

    watch(getStep, (newValue, oldValue) => {
      step.value = newValue
    })

    watch(getImages, (newValue, oldValue) => {
      images.value = newValue
    })

    watch(getPoints, (newValue, oldValue) => {
      points.value = newValue
    })

    /* watch(getPoints, (newValue, oldValue) => {
      points.value = [...points.value, newValue]
    })

    watch(getImages, (newValue, oldValue) => {
      images.value = [...images.value, newValue]
    }) */

    const nextStep = async () => {
      await setStorageStep(2)
      await getStorageStep()
    }

    const endStep = async () => {
      await setStorageStep(3)
      await getStorageStep()
    }

    const onRemoveStorage = async () => {
      await removeStorage()
      await getStorageStep()
      /* await getStoragePoints()
      await getStorageImages() */
    }

    const test = ref('')

    const onCreateReport = async () => {
      try {
        await createReport({
          points: points.value,
          images: images.value,
          user_id: modelReport.value.user_id,
          status: modelReport.value.status,
          description: modelReport.value.description,
          published: modelReport.value.published,
          check: modelReport.value.check
        })

        /* await onRemoveStorage()
        await getStorageStep()
        await getStoragePoints()
        await getStorageImages() */
      } catch (error) {
        console.log('---error onCreateReport', error)
      }
    }

    const startBackgroundGeolocation = async (callback) => {
      const callbackId = await BackgroundGeolocation.addWatcher(
        {
          backgroundMessage: 'Не закрывайте приложение',
          backgroundTitle: 'Вы вышли на проверку',
          requestPermissions: true,
          stale: false,
          distanceFilter: 5
        },
        async (location, error) => {
          console.log('=====BackgroundGeolocation', BackgroundGeolocation)
          if (error) {
            if (error.message === 'User denied location permission') {
              if (window.confirm(
                'Этому приложению требуется ваше местоположение, ' +
                'но у него нет разрешения.\n\n' +
                'Открыть настройки сейчас?'
              )) {
                BackgroundGeolocation.openSettings()
              }
            }
            /* if (error.message === 'Location services disabled.') {} */
            /* if (error.code === 'NOT_AUTHORIZED') {
              if (window.confirm(
                'Этому приложению требуется ваше местоположение, ' +
                'но у него нет разрешения.\n\n' +
                'Открыть настройки сейчас?'
              )) {
                await BackgroundGeolocation.openSettings()
              }
            } */
            return console.error(error)
          }
          setStoragePoints([...points.value, location])
          getStoragePoints()
        }
      )
      callback(callbackId)
    }

    const stopBackgroundGeolocation = async () => {
      await BackgroundGeolocation.removeWatcher({ id: idGeo.value })
      idGeo.value = ''
    }

    async function guessLocation (callback, timeout) {
      const lastLocation = ref([])
      BackgroundGeolocation.addWatcher(
        {
          requestPermissions: false,
          stale: true
        },
        function (location) {
          lastLocation.value = location || undefined
        }
      ).then(function (id) {
        setTimeout(function () {
          callback(lastLocation.value)
          BackgroundGeolocation.removeWatcher({ id })
        }, timeout)
      })
    }

    const captureImage = async () => {
      try {
        const image = await Camera.getPhoto({
          quality: 90,
          allowEditing: false,
          source: 'CAMERA',
          resultType: CameraResultType.Uri
        })
        console.log('---image', image)
        const img = ref({})
        img.value.src = image.webPath
        img.value.path = image.path
        await guessLocation(function (lastLocation) {
          test.value = image.path
          img.value.data = lastLocation
          setStorageImages([...images.value, img.value])
          getStorageImages()
        }, 1000)
      } catch (error) {
        console.log('---error', error)
      }
    }

    const startMonitor = async () => {
      await setStorageStep(2)
      await getStorageStep()
      await startBackgroundGeolocation((callbackId1) => {
        idGeo.value = callbackId1
      })
    }

    const endMonitor = async () => {
      await setStorageStep(3)
      await getStorageStep()
      await stopBackgroundGeolocation()
    }

    const getAllSrorage = async () => {
      await getStorageStep()
      await getStorageImages()
      await getStoragePoints()
    }

    const fetchReports = async () => {
      return await reportStore.fetchReports()
    }

    onMounted(async () => {
      await getAllSrorage()
      await onCreateReport()
      await fetchReports()
    })
    return {
      step,
      nextStep,
      onRemoveStorage,
      captureImage,
      images,
      points,
      modelReport,
      /* startBackgroundGeolocation,
      images,
      points,
      captureImage, */
      onCreateReport,
      endStep,
      geo1,
      geo2,
      l1,
      l2,
      onRemoveG1,
      onRemoveG2,
      g1,
      g2,
      startMonitor,
      endMonitor,
      idGeo
      /* getPoints,
      getImages */
    }
  }
})
</script>

<style scoped>
  section {
    background: #FCFCFC;
    overflow: hidden;
    overscroll-behavior: none;
  }

  section .content {
    padding: 15px;
  }

  .start-monitor {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-width: 100vw;
    height: 100vh;
  }

  .bottom-bar {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background: #E0EAF3;
    position: fixed;
    width: 100vw;
    bottom: 0;
    padding: 15px;
    box-shadow: 0px -2px 10px 0px #00000034;
  }

  .monitor {
    width: 100%;
    padding-bottom: 70px;
  }

  .monitor img {
    max-width: 100%;
  }
</style>
