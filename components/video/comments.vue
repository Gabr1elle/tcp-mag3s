<template>
  <div class="comments-infos"  :style="{ 'max-height': containerMaxHeight + 'px', overflow: 'scroll', transition: 'max-height 0.5s ease-in-out' }">
    <div class="comments">
      <UCard>
        <div class="comments-body" v-if="videoComments.length > 0">
          {{ videoComments.length }} comentários
          <div class="comments-list gap-4" :class="scroll? ' scroll' : ''">
            <div v-for="comment in videoComments" :key="comment.id" :v-if="comment.user" class="comment border border-black rounded py-5 px-3">
              <div class="comment-header grid grid-cols-5 items-center">
                <div class="comment-header-avatar" :class="user.id == comment.user.id ? 'order-last' : ''">
                  <UAvatar v-if="comment.user.profileURL" :src="comment.user.profileURL" size="xl" />
                  <UAvatar v-else icon="i-heroicons-user-circle" size="xl" />
                </div>
                <div class="comment-header-infos col-span-4 ">
                  <div class="flex">
                    <p :class="user.id == comment.user.id ? 'text-left' : 'text-right'">{{ comment.data }}</p>
                  </div>
                  <div class="grid grid-cols-2 justify-between">
                    <UButton v-if="user.id == comment.user.id" @click="deleteComment(comment.id)" icon="i-heroicons-trash"
                    variant="ghost" class="text-black black:text-white" />
                    <small class="flex flex-col" :class="user.id == comment.user.id ? 'items-end' : ' items-start'">
                      <h4>{{ comment.user.name }}</h4>
                      <span>
                        {{ new Date(comment.createdAt).toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        }) }}
                      </span>
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </UCard>
    </div>
  </div>
  <div class="comments-footer grid items-center gap-4">
    <div class="comment-form-input w-full">
      <UForm>
        <div class="grid grid-cols-12 gap-4">
          <UInput v-model="currentComment" @input="limitInput"  placeholder="Escreva algo legal" class="col-span-11">
            <template #leading>
              <UAvatar v-if="user.profileURL" :src="user.profileURL" size="2xs" />
              <UAvatar v-else icon="i-heroicons-user-circle" size="2xs" />
            </template>
          </UInput>
          <div class="flex items-center justify-center">
            <UButton type="submit" @click="sendComment" icon="i-heroicons-paper-airplane" variant="ghost"
              class="text-black black:text-white" />
          </div>
        </div>
      </UForm>
    </div>
  </div>
</template>

<script setup>
import { io } from "socket.io-client";
const socket = io();

const currentComment = ref('')

const user = useUserAuth();
const scroll = ref(false)
const videoComments = ref([])
const containerMaxHeight = ref(0)

const props = defineProps({
  video: Object
})
onNuxtReady(async () => {
  videoComments.value = props.video.comments
  if (videoComments.value.length == 0) {
    videoComments.value = [{
      id: 0,
      data: 'Seja o primeiro a comentar'
    }]
  }
})

const emit = defineEmits(['commentsLenght'])


socket.on('videoComments', (data) => {
  videoComments.value = data.body
  emit('commentsUpdate', data.body)
  scrollToBottom()
});

const scrollToBottom = () => {
  const element = document.querySelector('.scroll');
  element.scrollTop = element.scrollHeight * 2;
}

watch(videoComments, () => {
  videoComments.value.length >= 6 ? scroll.value = true : scroll.value = false
})

watch(() => props.video.showComments, (value) => {
  if (value) {
    containerMaxHeight.value = 450
  } else {
    containerMaxHeight.value = 0
  }
});

const limitInput = (event) => {
      if (event.target.value.length > 64) {
        event.target.value = event.target.value.slice(0, 64);
        currentComment.value = event.target.value;
      }
    };


function sendComment() {
  props.video.showComments = true
  if (currentComment.value.length > 0) {
    const data = {
      data: currentComment.value,
      video: props.video.id,
      userId: user.id
    }
    socket.emit('submitComment', data)
    currentComment.value = ''
  }
}
function deleteComment(id) {
  const data = {
    id: id,
    video: props.video.id
  }
  socket.emit('deleteComment', data)
}

</script>
<style lang="scss" scoped>
.comment {
  &:not(:first-child){
    margin: 20px 0;
  }
  &-header {
    &-avatar {
      display: flex;
      justify-content: center;

      img {
        width: 80px;
        height: 80px;
      }
    }
  }
}
.scroll{
  overflow-y: scroll;
  max-height: 300px;
}

</style>
