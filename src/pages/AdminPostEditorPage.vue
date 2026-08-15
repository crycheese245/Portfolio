<script setup>
import { computed, nextTick, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { createPost, fetchAdminPost, updatePost, uploadImage } from '../api/blog.js'
import { sanitizeArticleHtml } from '../utils/sanitizeHtml.js'

const route = useRoute()
const router = useRouter()

const isEdit = computed(() => route.name === 'admin-post-edit')
const postId = computed(() => (isEdit.value ? String(route.params.id) : null))

const title = ref('')
const excerpt = ref('')
const coverImage = ref('')
const published = ref(false)
const editorRef = ref(null)

const loading = ref(isEdit.value)
const saving = ref(false)
const coverUploading = ref(false)
const error = ref('')

async function loadPost() {
  try {
    const post = await fetchAdminPost(postId.value)
    title.value = post.title
    excerpt.value = post.excerpt
    coverImage.value = post.coverImage || ''
    published.value = post.published
    await nextTick()
    if (editorRef.value) editorRef.value.innerHTML = post.contentHtml
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Không tải được bài viết'
  } finally {
    loading.value = false
  }
}

function command(name) {
  editorRef.value?.focus()
  document.execCommand(name, false)
}

function commandBlock(tag) {
  editorRef.value?.focus()
  document.execCommand('formatBlock', false, tag)
}

async function insertImage() {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'image/png,image/jpeg,image/webp,image/gif'
  input.onchange = async () => {
    const file = input.files?.[0]
    if (!file) return
    try {
      const url = await uploadImage(file)
      editorRef.value?.focus()
      document.execCommand('insertHTML', false, `<p><img src="${url}" alt=""></p>`)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Tải ảnh thất bại'
    }
  }
  input.click()
}

function insertLink() {
  const url = window.prompt('Nhập URL liên kết (https://...)')
  if (!url?.trim()) return
  editorRef.value?.focus()
  document.execCommand('createLink', false, url.trim())
}

async function selectCoverImage(event) {
  const file = event.target.files?.[0]
  event.target.value = ''
  if (!file) return
  coverUploading.value = true
  error.value = ''
  try {
    coverImage.value = await uploadImage(file)
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Tải ảnh bìa thất bại'
  } finally {
    coverUploading.value = false
  }
}

async function save() {
  if (!title.value.trim()) {
    error.value = 'Tiêu đề không được để trống'
    return
  }

  saving.value = true
  error.value = ''
  try {
    const payload = {
      title: title.value.trim(),
      excerpt: excerpt.value.trim(),
      coverImage: coverImage.value,
      contentHtml: sanitizeArticleHtml(editorRef.value?.innerHTML ?? ''),
      published: published.value,
    }

    if (isEdit.value) {
      await updatePost(postId.value, payload)
    } else {
      await createPost(payload)
    }

    router.push('/quan-tri')
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Lưu thất bại'
  } finally {
    saving.value = false
  }
}

onMounted(() => {
  if (isEdit.value) loadPost()
})
</script>

<template>
  <section class="editor-page">
    <div class="editor-page__head">
      <RouterLink to="/quan-tri" class="editor-back">← Danh sách bài viết</RouterLink>
      <h1>{{ isEdit ? 'Sửa bài viết' : 'Bài viết mới' }}</h1>
    </div>

    <p v-if="loading" class="editor-empty">Đang tải...</p>

    <form v-else class="editor-form" @submit.prevent="save">
      <label>
        <span>Tiêu đề</span>
        <input v-model="title" required maxlength="200" placeholder="Tiêu đề bài viết" />
      </label>

      <label>
        <span>Tóm tắt (hiển thị ở trang danh sách blog)</span>
        <textarea v-model="excerpt" rows="2" maxlength="400" placeholder="Tóm tắt ngắn gọn..." />
      </label>

      <label>
        <span>Ảnh bìa</span>
        <div class="editor-cover">
          <img v-if="coverImage" :src="coverImage" alt="Ảnh bìa" class="editor-cover__preview" />
          <div class="editor-cover__upload">
            <input id="cover-upload" type="file" accept="image/png,image/jpeg,image/webp,image/gif" @change="selectCoverImage" />
            <label for="cover-upload" class="btn btn-outline btn-sm">
              {{ coverUploading ? 'Đang tải...' : coverImage ? 'Đổi ảnh bìa' : 'Chọn ảnh bìa' }}
            </label>
          </div>
        </div>
      </label>

      <label>
        <span>Nội dung</span>
        <div class="editor-toolbar">
          <button type="button" title="Đậm" @click="command('bold')"><b>B</b></button>
          <button type="button" title="Nghiêng" @click="command('italic')"><i>I</i></button>
          <button type="button" title="Tiêu đề phụ" @click="commandBlock('h2')">H2</button>
          <button type="button" title="Tiêu đề nhỏ" @click="commandBlock('h3')">H3</button>
          <button type="button" title="Đoạn văn" @click="commandBlock('p')">P</button>
          <button type="button" title="Danh sách" @click="command('insertUnorderedList')">• List</button>
          <button type="button" title="Danh sách số" @click="command('insertOrderedList')">1. List</button>
          <button type="button" title="Trích dẫn" @click="commandBlock('blockquote')">"</button>
          <button type="button" title="Chèn liên kết" @click="insertLink">Link</button>
          <button type="button" title="Chèn hình ảnh" @click="insertImage">Ảnh</button>
        </div>
        <div ref="editorRef" class="editor-content" contenteditable="true" />
      </label>

      <label class="editor-publish">
        <input v-model="published" type="checkbox" />
        <span>Đăng công khai (bỏ chọn để lưu nháp)</span>
      </label>

      <p v-if="error" class="editor-error">{{ error }}</p>

      <div class="editor-actions">
        <button class="btn btn-primary" type="submit" :disabled="saving">
          {{ saving ? 'Đang lưu...' : 'Lưu bài viết' }}
        </button>
      </div>
    </form>
  </section>
</template>

<style scoped>
.editor-page {
  max-width: 760px;
  margin: 0 auto;
  padding: 140px 24px 80px;
}

.editor-page__head {
  margin-bottom: 32px;
}

.editor-back {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-gray);
}

.editor-back:hover {
  color: var(--primary);
}

.editor-page__head h1 {
  font-size: 26px;
  font-weight: 800;
  color: var(--text-dark);
  margin-top: 10px;
}

.editor-empty {
  padding: 60px 0;
  text-align: center;
  color: var(--text-gray);
}

.editor-form label {
  display: block;
  margin-bottom: 22px;
}

.editor-form > label > span {
  display: block;
  margin-bottom: 8px;
  font-size: 13px;
  font-weight: 700;
  color: var(--text-dark);
}

.editor-form input[type="text"],
.editor-form input:not([type]),
.editor-form textarea {
  width: 100%;
  padding: 11px 14px;
  border-radius: 10px;
  border: 1.5px solid var(--border);
  font-size: 14px;
  font-family: inherit;
  outline: none;
  resize: vertical;
}

.editor-form input:focus,
.editor-form textarea:focus {
  border-color: var(--primary);
}

.editor-cover {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.editor-cover__preview {
  width: 140px;
  height: 90px;
  object-fit: cover;
  border-radius: 10px;
  border: 1px solid var(--border);
}

.editor-cover__upload input {
  display: none;
}

.editor-cover__upload label {
  cursor: pointer;
}

.editor-toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  padding: 8px;
  border: 1.5px solid var(--border);
  border-bottom: none;
  border-radius: 10px 10px 0 0;
  background: var(--bg-light);
}

.editor-toolbar button {
  padding: 7px 12px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  color: var(--text-dark);
  background: white;
  border: 1px solid var(--border);
  cursor: pointer;
  font-family: inherit;
}

.editor-toolbar button:hover {
  border-color: var(--primary);
  color: var(--primary);
}

.editor-content {
  min-height: 320px;
  padding: 18px;
  border: 1.5px solid var(--border);
  border-radius: 0 0 10px 10px;
  font-size: 15px;
  line-height: 1.8;
  color: var(--text-dark);
  outline: none;
}

.editor-content :deep(img) {
  max-width: 100%;
  border-radius: 10px;
  margin: 12px 0;
}

.editor-content :deep(h2) { font-size: 22px; font-weight: 800; margin: 20px 0 10px; }
.editor-content :deep(h3) { font-size: 18px; font-weight: 700; margin: 16px 0 8px; }
.editor-content :deep(blockquote) {
  border-left: 3px solid var(--primary);
  padding-left: 16px;
  color: var(--text-gray);
  margin: 12px 0;
}
.editor-content :deep(ul),
.editor-content :deep(ol) {
  padding-left: 24px;
  margin: 10px 0;
}

.editor-publish {
  display: flex;
  align-items: center;
  gap: 10px;
}

.editor-publish input {
  width: 18px;
  height: 18px;
}

.editor-publish span {
  font-size: 14px;
  color: var(--text-dark);
  font-weight: 600;
}

.editor-error {
  margin-bottom: 16px;
  font-size: 13px;
  font-weight: 600;
  color: #dc2626;
}
</style>
